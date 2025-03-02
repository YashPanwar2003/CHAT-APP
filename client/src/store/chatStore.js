import { create } from "zustand";

const useChatStore = create((set,get) => ({
    selectedUser: null,
    users:[],
    gettingUsers: false,
    gettingMessages: false,
    messages: [],
    setSelectedUser: (arg) => set({ selectedUser: arg }),
    setUsers:(arg)=>set({users:[...arg]}),
    addUser:(arg)=>set({users:[...get().users,arg]}),
    setGettingUsers: (arg) => set({ gettingUsers: arg }),
    setGettingMessages: (arg) => set({ gettingMessages: arg }),
    setMessages: (arg) => set({messages:[...arg]}),
    addMessage: (arg) => {
        console.log(get().messages)
        set({messages:[arg,...get().messages]})
    },

}));
export default useChatStore