import { LogOut } from "lucide-react"
import apiService from "../../lib/axios"
import { useNavigate } from "react-router-dom"
export default function Logout() {
    const navigate = useNavigate()
    const handleClick = async () => {
        const result = await apiService.post("/auth/logout")
        if (result.status === 500) {
            toast.error("Can't sign out", {
                autoClose: 3000,
                draggable: true,
                theme: "dark",
                closeOnClick: true,
                position: "bottom-right",
                closeButton: false,
            })
        }
        else {
            navigate("/login")
        }
    }
    return (
        <button onClick={handleClick}
            className=" text-white text-sm flex justify-start items-center gap-4 cursor-pointer w-full hover:bg-[rgba(255,255,255,0.2)] p-2 py-3 rounded-xl transition-all duration-200 "
        >
            <LogOut className="size-sm" />
            {"Log-Out"}
        </button>
    )
}