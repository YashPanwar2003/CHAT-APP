import { create } from "zustand";
const useChatStore = create((set) => ({
    selectedUser: null,
    users:[],
    gettingUsers: false,
    gettingMessages: false,
    messages: [],
    setSelectedUser: (arg) => set({ selectedUser: arg }),
    setUsers:(arg)=>set({users:[...arg]}),
    setGettingUsers: (arg) => set({ gettingUsers: arg }),
    setGettingMessages: (arg) => set({ gettingMessages: arg }),
    setMessages: (arg) => set({ messages: [...arg] }),
    addMessage: (arg) => set(state => ({ messages: [arg, ...state.messages] })),

}));
export default useChatStore