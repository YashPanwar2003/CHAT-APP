import apiService from "../lib/axios";
const userSignUp = async (form) => {
    const profilePic = "https://avatar.iran.liara.run/public/boy?username="+form.username.split(" ")[0]

    const result = await apiService.post("/auth/signup", { profilePic, ...form });
    return result;
}
export default userSignUp