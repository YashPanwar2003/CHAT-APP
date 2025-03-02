import useChatStore from "../../store/chatStore"
import useAuthStore from "../../store/authStore";
import ChatSkeletons from "../ui/ChatSkeletons"
import { useEffect, useRef, useState } from "react";
import getMessages from "../../services/getMessages";
import { Send } from "lucide-react"
export default function ChatList() {
    const [text, setText] = useState("")
    const { gettingMessages, selectedUser, setGettingMessages, setMessages, addMessage, messages } = useChatStore()
    const { authUser, socket } = useAuthStore()

    useEffect(() => {
        setGettingMessages(true)
        async function fetch() {
            const result = await getMessages({ senderId: authUser._id, receiverId: selectedUser._id })
            if (result.status === 500) {
                throw new Error(result.data?.msg)
            }
            return result.data
        }
        fetch().then(data => {
            const chatMessages = data?.msg?.reverse()
            setMessages(chatMessages)
        }).catch(err => console.log(err)).finally(() => {
            setGettingMessages(false)
        })

    }, [selectedUser])
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === "") return;
        const data = {
            senderId: authUser._id,
            receiverId: selectedUser._id,
            date: Date.now(),
            text,
            file: ""
        }
        socket.emit("message", data)
        setText("")
        addMessage(data)

    }
    return (
        <div className="flex flex-col p-1 pb-2 h-full gap-2">
            <div className="top-0 z-0 w-full h-fit bg-slate-800 rounded-tr-xl rounded-tl-xl flex justify-start gap-2 pl-3 py-2 items-center text-white">
                <img src={selectedUser?.profilePic || "/assets/placeholder.jpg"} alt="" className="h-10 w-10 object-cover rounded-full bg-cover" />
                <h4 className="text-sm ">{selectedUser.username}</h4>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex flex-col-reverse w-full h-[70%] gap-2 text-sm  grow font-normal scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-slate-800">
              
                {gettingMessages ? <ChatSkeletons /> : <Messages />}
                

            </div>

            <form className="flex mt-3  justify-center items-center gap-3 w-full h-[7%]" onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" value={text} onChange={(e) => { setText(e.target.value) }} style={{
                    cursor: gettingMessages ? "not-allowed" : "text",
                }} disabled={gettingMessages} className=" w-[70%] grow-[1] h-full text-sm py-1 px-4 rounded-xl" />
                <button style={{
                    cursor: gettingMessages ? "not-allowed" : "pointer",
                }} disabled={gettingMessages} type="submit" className="font-bold cursor:pointer rounded-lg bg-blue-900 hover:bg-blue-800 active:bg-blue-700 transition-all duration-300 text-sm py-2 px-4"><Send /></button>
            </form>


        </div>
    )
}
function getDate(dateString) {
    const dateObject = new Date(dateString)
    const hours = dateObject.getHours()
    const minutes = dateObject.getMinutes()
    const newHours = hours % 12;
    const timeFormat = hours / 12 < 1 ? "AM" : "PM";
    return `${newHours < 10 ? `0${newHours}` : newHours}:${minutes < 10 ? `0${minutes}` : minutes} ${timeFormat}`
}

function Messages() {

    const { authUser } = useAuthStore()
    const { messages } = useChatStore()
    return (
        <>
            {messages.map((msg) => {
                if (authUser._id === msg.senderId) {
                    return (<div className="p-2">
                        <div key={msg.createdAt} className="chat chat-end ">
                            <div className=" rounded-2xl p-2 px-3 chat-bubble  max-w-3/5 flex flex-col gap-1">
                                {msg?.text}

                            </div>


                        </div>
                        <div className="text-[9px] text-gray-500 text-right mr-2">{getDate(msg.date)}</div>
                    </div>)
                } else {
                    return (
                        <div className="">
                            <div key={msg.createdAt} className="chat chat-start ">
                                <div className="max-w-3/5 rounded-2xl p-2 px-3 bg-slate-700 chat-bubble flex flex-col gap-1">
                                    {msg?.text}

                                </div>
                                
                            </div>
                            <div className="text-[9px] ml-2 text-white text-left">{getDate(msg.date)}</div>
                        </div>
                    )
                }
            })}
        </>
    )
}