import { UserRound, Mail, CalendarClock } from "lucide-react"
import { getJoinDate } from "../../utils/dateUtils"
import Logout from "../ui/Logout"
import DeleteAccount from "../ui/Delete"
export default function UserDetails({ authUser }) {
    return (
        <div
            className="text-white text-lg bg-transparent mt-5 w-full flex flex-col justify-start items-start gap-4"
        >
            <div className="w-full divide-y-1 divide-neutral-600">
                <div className="flex justify-start items-center gap-8 py-4 pl-1 ">
                    <div ><UserRound className="size-lg" /></div>
                    <div className="w-full text-lg font-medium text-white rounded-lg">
                        {authUser?.username}
                    </div>
                </div>
                <div className="flex justify-start items-center py-4 gap-8 pl-1">
                    <div><Mail className="size-lg" /></div>
                    <div className="w-full text-lg font-medium text-white rounded-lg">
                        {authUser?.email}
                    </div>
                </div>
                <div className="flex justify-start items-center gap-8 py-4 pl-1">
                    <div><CalendarClock className="size-lg" /></div>
                    <div className="w-full text-lg font-medium text-white rounded-lg">{authUser && getJoinDate(authUser.createdAt)}</div>
                </div>

            </div>
            <div className="w-3/5 mt-25">
                <Logout />
                <DeleteAccount />
            </div>

        </div>
    )
}