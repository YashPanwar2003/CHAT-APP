import {create} from "zustand"
const authStore=(set)=>({
   authUser:null,
   setAuthUser:(arg)=>set({authUser:arg}),
})
const useAuthStore=create(authStore)
export default useAuthStore