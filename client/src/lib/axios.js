import axios  from "axios";
import path from "path";
const baseURL=import.meta.env.MODE==="development" ? path.join(import.meta.env.VITE_DOMAIN_NAME,"api"): "/api";
const apiService=axios.create({
    baseURL:baseURL,
    withCredentials:true
})
export default apiService;
