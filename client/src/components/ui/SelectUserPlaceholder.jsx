import {MessageSquareText} from "lucide-react"
export default function Placeholder(){
    return(
        <div className="h-full w-full flex flex-col gap-6 justify-center items-center">
            <MessageSquareText className="size-[20%] object-center" />
            <h1 className="text-xl font-medium">Select User to Message..</h1>
        </div>
    )
}