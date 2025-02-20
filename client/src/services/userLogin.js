import apiService from "../lib/axios";
const userLogin=async(form)=>{
    const result =await apiService.post("/auth/login",form)
    return result;
}
export default userLogin