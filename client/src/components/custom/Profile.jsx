import useAuthStore from "../../store/authStore"
import { Camera } from "lucide-react"
import placeholder from "../../../public/assets/placeholder.jpg"
import apiService from "../../lib/axios"
import { useTransition } from "react"
import UserDetails from "./UserDetails"
import Logout from "./Logout"
import { toast } from "react-toastify"
import "react-toastify/ReactToastify.css"
const Profile = () => {
    const { authUser, setAuthUser } = useAuthStore()
    const [updatingProfile, setTransition] = useTransition(false)
    const handleFile = (e) => {
        const file = e.target.files[0]
        if (!file) return;
        setTransition(async () => {
            try {
                const formData = new FormData()
                formData.append("profilePic", file)
                const response = await apiService.post("/user/updateProfile", formData)
                if (response.status !== 200) {
                    throw new Error(response.data?.msg)
                }
                else {
                    const { data: { updateUser } } = response
                    setAuthUser(updateUser)
                }
            } catch (err) {
                console.log(err)
                toast.error(err?.message, {
                    theme: "dark",
                    autoClose: 3000,
                    closeOnClick: true,
                    closeButton: false,
                    pauseOnHover: false,
                })
            } finally {
                e.target.value = ""
            }
        })

    }
    return (
        <div
            className="h-full w-full flex flex-col justify-start items-center space-y-3"
        >
            <h1 className="text-center font-bold text-2xl">Profile</h1>
            <div
                className="h-[150px] w-[150px] space-y-4 relative rounded-full bg-cover object-cover bg-white outline-gray-500 outline-4"
            >
                <img
                    src={authUser?.profilePic || placeholder}
                    alt=""
                    className="rounded-full h-full w-full bg-cover object-cover"
                />
                <label htmlFor="file-input"
                    className="border-white border-2 bottom-1 right-1 h-10 w-10 rounded-full cursor-pointer absolute text-black"
                >
                    <input
                        type="file"
                        name="profilePic"
                        id="file-input"
                        onChange={handleFile}
                        className="hidden"
                        key={updatingProfile}
                        accept=".jpg,.jpeg,.png,.svg"
                    />
                    <div
                        className="h-full w-full bg-transparent backdrop-blur-xl rounded-full flex justify-center items-center hover:bg-[rgba(255,255,255,0.2)] transition-all duration-300 "
                    >
                        <Camera className="text-white" />
                    </div>
                </label>

            </div>
            <h6
                className="text-white font-medium capitalize text-center"
            >
                {updatingProfile ? "updating...." : "Select picture to update"}
            </h6>
            <UserDetails authUser={authUser} />
        </div>
    )
}

export default Profile