import { useEffect, useRef } from "react";
import useChatStore from "../../store/chatStore";

const Contacts = ({ user, search, setSearch }) => {

    const { selectedUser, setSelectedUser,setGettingMessages,gettingMessages } = useChatStore()
    const ref = useRef()
    const selectedProps = "bg-slate-700 rounded-xl shadow-[4px_4px_25px_rgba(0,0,0,0.4)]"
    const hoverProps = "hover:rounded-xl hover:shadow-[4px_4px_25px_rgba(0,0,0,0.4)] hover:bg-slate-700   transition-all duration-100"
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
            
            className={`h-[20%] w-full flex justify-start items-center gap-3 text-white ${user.username !== selectedUser?.username ? hoverProps : ""} transition-all duration-100 p-3 cursor-pointer active:bg-slate-500 ${selectedUser?.email === user.email ? selectedProps : ""}`} 
            key={user.email}>
            <img src={user.profilePic} alt="" className="h-10 w-10 object-cover rounded-full bg-cover" />
            <h4 className="text-sm sm:hidden md:block">{user.username}</h4>
        </div>
    )
}
export default Contacts
