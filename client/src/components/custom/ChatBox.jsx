import useChatStore from "../../store/chatStore"
import ChatList from "./ChatList"
import Placeholder from "../ui/SelectUserPlaceholder"
export default function ChatBox(){
   
    const {selectedUser} = useChatStore()
   
    return(
        <div className="h-full max-w-[70%] grow-1 w-full p-2 border-l-2 border-[rgba(128,128,128,0.2)]">
            <div className="bg-[#181A1C] h-full w-full rounded-xl">
              {!selectedUser ? <Placeholder/> :<ChatList/>}
            </div>
        </div>
    )
}