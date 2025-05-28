import { create } from "zustand";

const useChatStore = create((set,get) => ({
    selectedUser: null,
    users:[],
    gettingUsers: false,
    gettingMessages: false,
    messages: [],
    onlineUsers:null,
    setSelectedUser: (arg) => set({ selectedUser: arg }),
    setUsers:(arg)=>set({users:[...arg]}),
    addUser:(arg)=>set({users:[...get().users,arg]}),
    setGettingUsers: (arg) => set({ gettingUsers: arg }),
    setGettingMessages: (arg) => set({ gettingMessages: arg }),
    setMessages: (arg) => set({messages:[...arg]}),
    addMessage: (arg) => {
       
        set({messages:[...get().messages,arg]})
    },
    setOnlineUsers:(arg)=>set({onlineUsers:arg}),
   

}));
export default useChatStore