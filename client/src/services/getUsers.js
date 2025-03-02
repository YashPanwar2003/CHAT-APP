import apiService from "../lib/axios";
const getAllUsers=async ()=>{
    const result = await apiService.get("/user/getUsers")
    return result;
}
export default getAllUsers