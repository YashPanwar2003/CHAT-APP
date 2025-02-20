import useChatStore from "../../store/chatStore"
import useAuthStore from "../../store/authStore";
import ChatSkeletons from "../ui/ChatSkeletons"
import { useEffect } from "react";
import messages from "../../utils/messageData";
export default function ChatList() {
    const { gettingMessages, selectedUser, setGettingMessages } = useChatStore()
    useEffect(() => {
        setGettingMessages(true)
        setTimeout(() => {
            setGettingMessages(false)
        }, 2000);
    }, [selectedUser])
    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return (
        <div className="flex flex-col p-1 pb-2 h-full gap-2">
            <div className="top-0 z-0 w-full h-fit bg-slate-800 rounded-tr-xl rounded-tl-xl flex justify-start gap-2 pl-3 py-2 items-center text-white">
                <img src={selectedUser.profilePic} alt="" className="h-10 w-10 object-cover rounded-full bg-cover" />
                <h4 className="text-sm ">{selectedUser.username}</h4>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex flex-col-reverse w-full h-[70%] gap-4 text-sm rounded-lg grow font-normal">
                {gettingMessages ? <ChatSkeletons /> : <Messages />}
            </div>

            <form className="flex mt-3  justify-center items-center gap-3 w-full h-[7%]" onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" style={{
                    cursor: gettingMessages ? "not-allowed" : "text",
                }} disabled={gettingMessages} className=" w-[70%] grow-[1] h-full text-sm py-1 px-4 rounded-xl" />
                <button style={{
                    cursor: gettingMessages ? "not-allowed" : "pointer",
                }} disabled={gettingMessages}  type="submit" className="font-bold cursor:pointer rounded-lg bg-indigo-800 text-sm py-2 px-4">Send</button>
            </form>


        </div>
    )
}
function Messages() {
    // const { messages } = useChatStore()
    const { authUser } = useAuthStore()
    return (
        <>
            {messages.reverse().map((val,index) => {
                if (index%2==0) {
                    return <div key={val._id} className="chat-end">
                        <div className=" rounded-2xl p-2 chat-bubble max-w-3/5 flex flex-col gap-1">
                            {val?.text}
                            <span className="text-[10px] text-gray-500 text-right">20-12-2025</span>
                        </div>
                        
                    </div>
                } else {
                    return (
                        <div key={val._id} className="chat-start">
                            <div className="max-w-3/5 rounded-2xl p-2 bg-slate-700 chat-bubble flex flex-col gap-1">
                                {val.text}
                                <span className="text-[10px] text-white text-left">10-12-25</span>
                            </div>
                        </div>
                    )
                }
            })}
        </>
    )
}