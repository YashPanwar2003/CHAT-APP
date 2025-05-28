import apiService from "../lib/axios";
async function deleteUserAccount(userId){
    try{
        const result=await apiService.delete("/user/delete/"+userId)
        return result
    }
    catch(err){
        throw new Error(err.response.data.msg)
    }
}
export default deleteUserAccount