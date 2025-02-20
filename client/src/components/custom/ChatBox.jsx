import { useEffect } from "react"
import useChatStore from "../../store/chatStore"
import ChatList from "./ChatList"
export default function ChatBox(){
   
    const {selectedUser} = useChatStore()
   
    return(
        <div className="h-full max-w-[70%] w-full p-2">
            <div className="bg-slate-800 h-full w-full rounded-xl">
              {!selectedUser ? <img src={null} alt="it is an placeholder image"/> :<ChatList/>}
              
            </div>
        </div>
    )
}