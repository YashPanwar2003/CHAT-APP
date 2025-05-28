import apiService from "../lib/axios";
const userCheck=async()=>{
    return await apiService.get("/user/check");
   
}
export default userCheck