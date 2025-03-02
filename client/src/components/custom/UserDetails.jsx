import { UserRound, Mail } from "lucide-react"
import { getJoinDate } from "../../utils/dateUtils"
import Logout from "./Logout"
export default function UserDetails({ authUser }) {
    return (
        <div
            className="text-white text-lg bg-transparent  w-full flex flex-col justify-start items-start gap-4"
        >
            <div className="w-full">
                <div className="flex justify-start items-center gap-2 pl-1 ">
                    <div ><UserRound className="size-[15px]" /></div>
                    <h3 className="text-[12px]">Username</h3>
                </div>
                <div className="p-2 w-full border-white border-1 text-sm font-medium text-white rounded-lg">
                    {authUser?.username}
                </div>
            </div>
            <div className="w-full">
                <div className="flex justify-start items-center gap-2 pl-1">
                    <div><Mail className="size-[15px]" /></div>
                    <h3 className="text-[12px]">Email</h3>
                </div>
                <div className="p-2 w-full border-white border-1 text-sm font-medium text-white rounded-lg">
                    {authUser?.email}
                </div>
                <h4 className="text-[14px] mt-1">
                    {"Joined on : " + getJoinDate(authUser?.createdAt)}
                </h4>
            </div>
            <div className="w-3/5 mt-5">
                <Logout />
            </div>

        </div>
    )
}