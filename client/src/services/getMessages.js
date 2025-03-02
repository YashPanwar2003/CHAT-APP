import apiService from "../lib/axios"
const getMessages=async({senderId,receiverId})=>{
   const result=await apiService.post("/user/messages",{senderId,receiverId})
   return result;
}
export default getMessages