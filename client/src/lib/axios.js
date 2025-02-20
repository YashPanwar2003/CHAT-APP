import axios  from "axios";
const domainName=import.meta.env.VITE_DOMAIN_NAME;
const apiService=axios.create({
    baseURL:`${domainName}/api`,
    withCredentials:true
})
export default apiService