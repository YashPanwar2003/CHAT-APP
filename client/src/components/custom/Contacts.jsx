import { useEffect, useRef } from "react";
import useChatStore from "../../store/chatStore";

const Contacts = ({ user, search, setSearch }) => {

    const { selectedUser, setSelectedUser,onlineUsers } = useChatStore()
    const ref = useRef()
    const selectedProps = "bg-indigo-800 rounded-xl shadow-[4px_4px_25px_rgba(0,0,0,0.4)]"
    const hoverProps = "hover:rounded-xl hover:shadow-[4px_4px_25px_rgba(0,0,0,0.4)] hover:bg-neutral-800 transition-all duration-100"
    useEffect(() => {
        if (user.username === selectedUser?.username) {
            ref.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            })
        }
    }, [selectedUser])
    const handleSelect = (arg) => {

        if (arg.email !== selectedUser?.email) {
            setSelectedUser(arg);
            if (search.trim() !== "") {
                setSearch("")
            }

        }
    }
    return (
        <div ref={ref} onClick={() => handleSelect(user)}
            
            className={`h-[16%] w-full flex justify-start  items-center gap-3 text-white ${user.username !== selectedUser?.username ? hoverProps : ""} transition-all duration-100 p-4 cursor-pointer active:bg-neutral-700 ${selectedUser?.email === user.email ? selectedProps : ""}`} 
            >
            <div className="h-fit w-fit min-w-10 rounded-full flex justify-center items-center relative">
                <img src={user.profilePic || "/assets/placeholder.jpg"} alt="" className="h-11 w-11  object-cover rounded-full bg-cover" />
                { onlineUsers?.get(user._id) && <div className="absolute h-1/4 w-1/4 rounded-full bg-green-500 right-0 bottom-0"></div>}
            </div>
            <h4 className="text-sm font-medium sm:hidden md:w-1/2 md:block lg:w-auto lg:block break-words leading-tight">{user.username}</h4>
        </div>
    )
}
export default Contacts
