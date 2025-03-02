import { create } from "zustand"
import { io } from "socket.io-client"
import useChatStore from "./chatStore"
const useAuthStore = create((set, get) => ({
   authUser: null,
   setAuthUser: (arg) => {
      set({ authUser: arg })
      console.log(get().authUser)
   },
   socket: null,
   initSocket: (callback) => {
      if (!get().socket) {
         const {authUser}=get()
         if(!authUser){
            console.log("user not found ") 
            return;
         }
         const newSocket =  io(import.meta.env.VITE_DOMAIN_NAME,
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
         set({socket:newSocket})
         
         if(!newSocket.connected){
            newSocket.connect(get().authUser)
        }
        newSocket.removeAllListeners();
        newSocket.on("connect",callback)
        newSocket.on("userConnect",(user)=>{
         const {users,addMessage}=useChatStore.getState()
          const userExist=users.find(val=>{
            return val.email===user.email
          })
          if(userExist) return;
          addMessage(user)
          
        })
        newSocket.on("error",()=>{
         console.log(error.message)
        })
        
        newSocket.on("message",(data)=>{
         const {addMessage,selectedUser}=useChatStore.getState()
         if(selectedUser?._id===data.senderId || selectedUser?._id===data.receiverId){
            console.log("a message")
            addMessage(data)
          }
          
        })
      }
   },
   disSocket:()=>{
      const socket=get().socket
      if( socket?.connected){
         socket.disconnect()
      }
      set({socket:null})
   }

}))
export default useAuthStore