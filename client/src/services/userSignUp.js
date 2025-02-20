import apiService from "../lib/axios";
const userSignUp=async (form)=>{
    const result=await apiService.post("/auth/signup",form);
    return result;
}
export default userSignUp