import useChatStore from "../../store/chatStore"
import useAuthStore from "../../store/authStore";
import ChatSkeletons from "../ui/ChatSkeletons"
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import toastOptions from "../../utils/toastOptions";
import getMessages from "../../services/getMessages";
import {ArrowUpFromDot } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"
import { getCurrentTime, getDayLabel, isSameDayMessage } from "../../utils/dateUtils";
export default function ChatList() {
    const [text, setText] = useState("")
    const { gettingMessages, selectedUser, setGettingMessages, setMessages, addMessage, messages,onlineUsers } = useChatStore()
    const { authUser, socket } = useAuthStore()
    const bottomRef = useRef(null)
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
            const chatMessages = data?.msg
            setMessages(chatMessages)

        }).catch(err => console.log(err)).finally(() => {
            setGettingMessages(false)
        }).finally(() => bottomRef?.current?.scrollIntoView({ behavior: "smooth" }))

    }, [selectedUser])
    useLayoutEffect(() => {

        const lastMessage = messages[messages.length - 1]
         
        if (lastMessage?.senderId === authUser._id) {
           bottomRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (text.trim() === "") return;
            const data = {
                senderId: authUser._id,
                receiverId: selectedUser._id,
                date: Date.now(),
                text,
                file: ""
            }
            socket.emit("message", data, (response) => {
                if (response.status === "ok") {
                    addMessage(data)
                } else {
                    toast.error(response.msg, toastOptions)
                }
            })
        } catch (err) {
            console.log(err)
        } finally {
            setText("")
        }
    }
    return (
        <div className="flex flex-col p-1 pb-2 h-full gap-2">
            <div className=" w-full h-[72px] rounded-tr-xl rounded-tl-xl flex justify-start gap-4 pl-3 pt-1.5 items-center text-white border-b-1 border-gray-600">
                <img src={selectedUser?.profilePic || "/assets/placeholder.jpg"} alt="" className="h-10 w-10 object-cover rounded-full bg-cover" />
                <div>
                    <h4 className="text-lg font-semibold grow-1">{selectedUser.username}</h4>
                    <p className="text-xs font-medium text-gray-400 text-left"> {onlineUsers?.get(selectedUser._id) ? "Online": "Offline"} </p>
                </div>
            </div>
            <div className="overflow-y-auto relative overflow-x-hidden flex flex-col w-full h-[70%] gap-2 text-sm  grow font-normal scrollbar-thin scrollbar-track-rounded-box scrollbar-thumb-gray-500 scrollbar-track-[#181A1C]">
                 
                {gettingMessages ? <ChatSkeletons /> : <Messages authUser={authUser} messages={messages} />}
                <div ref={bottomRef} className="bg-transparent"></div>
                

            </div>

            <form className="flex mt-3  justify-center items-center gap-3 w-full h-[9%]" onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" value={text} onChange={(e) => { setText(e.target.value) }} style={{
                    cursor: gettingMessages ? "not-allowed" : "text",
                }}
                    placeholder="Type a Message..."
                    disabled={gettingMessages} className=" w-[70%] grow-[1] text-md h-full font-medium py-1 border-none  focus:outline-none  px-4 rounded-xl" />
                <button style={{
                    cursor: gettingMessages ? "not-allowed" : "pointer",
                }} disabled={gettingMessages} type="submit" className="font-bold cursor:pointer rounded-full bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-700 transition-all duration-300 text-sm p-3 px-4"><ArrowUpFromDot /></button>
            </form>
            <ToastContainer />

        </div>
    )
}
function Messages({ authUser, messages }) {
    let lastMessageDate = null
    return (
        <>
            {messages.map((msg, idx) => {
                const timeLabel = getCurrentTime(msg.date)
                let showLabel = !lastMessageDate || !isSameDayMessage(lastMessageDate, msg.date)
                lastMessageDate = msg.date
                if (authUser._id === msg.senderId) {

                    return (
                        <div key={msg.date + idx}>
                            {showLabel && <div className="text-center text-lg font-medium py-2"> {getDayLabel(msg.date)} </div>}
                            <div className="pr-4" >
                                <div className="chat chat-end ">
                                    <div className="shadow-[4px_4px_25px_rgba(0,0,0,0.4)] rounded-2xl p-2 px-3 chat-bubble bg-white text-black font-medium  max-w-3/5 flex flex-col gap-1">
                                        {msg?.text}
                                    </div>
                                </div>
                                <div className="text-[10px] text-gray-500 text-right mr-4">{timeLabel}</div>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div key={msg.date + idx}>
                            {showLabel && <div className="text-center text-lg font-medium py-2"> {getDayLabel(msg.date)} </div>}
                            <div >
                                <div className="chat chat-start ">
                                    <div className=" shadow-[4px_4px_25px_rgba(0,0,0,0.4)] max-w-3/5 rounded-2xl p-2 px-3 bg-indigo-600 font-medium chat-bubble flex flex-col gap-1">
                                        {msg?.text}
                                    </div>

                                </div>
                                <div className="text-[10px] ml-4 text-white text-left">{timeLabel}</div>
                            </div>
                        </div>
                    )
                }
            })}
        </>
    )
}