import apiService from "../lib/axios";
const userCheck=async()=>{
    const result=await apiService.get("/user/check");
    return result;
}
export default userCheck