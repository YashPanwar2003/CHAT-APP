import { create } from "zustand"
import { io } from "socket.io-client"
import useChatStore from "./chatStore"
const BASE_URL=import.meta.env.MODE==="development"? import.meta.env.VITE_DOMAIN_NAME : "/"
const useAuthStore = create((set, get) => ({
   authUser: null,
   setAuthUser: (arg) => {
      set({ authUser: arg })
   },
   socket: null,
   initSocket: (callback) => {
      if (!get().socket) {
         const { authUser } = get()
         if (!authUser) {
            return;
         }
         const newSocket = io(BASE_URL,
            {
               withCredentials: true,
               autoConnect: false,
               reconnection: true,
               reconnectionAttempts: 3,
               reconnectionDelay: 10000,
               secure: true,
               query: {
                  userId: authUser?._id
               }
            }
         )
         set({ socket: newSocket })

         if (!newSocket.connected) {
            newSocket.connect(get().authUser)
         }
         newSocket.removeAllListeners();
         newSocket.on("connect", callback)
         newSocket.on("userConnect",(userMap)=>{
           const onlineUsersMap=new Map(userMap)
           const {setOnlineUsers}= useChatStore.getState()
          
           setOnlineUsers(onlineUsersMap)
         })
         newSocket.on("newUserJoined", (userObject) => {
            const {addUser}=useChatStore.getState()
            addUser(userObject)

         })
         newSocket.on("error", () => {
            console.log(err.message)
         })

         newSocket.on("message", (data) => {
            const { addMessage, selectedUser } = useChatStore.getState()
            if (selectedUser?._id === data.senderId || selectedUser?._id === data.receiverId) {

               addMessage(data)
            }

         })
         newSocket.on("userDisconnect",(userMap)=>{
            const onlineUsersMap=new Map(userMap)
            const {setOnlineUsers}=useChatStore.getState()
            setOnlineUsers(onlineUsersMap)
           
            
         })
      }
   },
   disSocket: () => {
      const socket = get().socket
      if (socket?.connected) {
         socket.disconnect()
      }
      set({ socket: null })
   }

}))
export default useAuthStore