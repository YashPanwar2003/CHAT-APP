import users from "../../utils/userData"
import { useMemo, useState } from "react"
import useChatStore from "../../store/chatStore"
import  Contacts  from "./Contacts"
import Skeleton from "../ui/Skeleton"

const ContactsList = () => {
    const {gettingUsers}=useChatStore()
    const [search, setSearch] = useState("")
    const filteredUsers = useMemo(() => users.filter(val => val.username.toLowerCase().startsWith(search.trim())), [users, search])

    return (

        <div className="md:w-full sm:w-fit h-full  flex flex-col col-span-1 overflow-hidden justify-center p-1 gap-4 max-w-[30%]">
            <div className="h-[13%] w-full md:flex justify-center items-center sm:hidden">
                
                <input className="bg-gray-800 rounded-2xl px-3 py-2 w-3/4 text-sm" type="text" value={search} placeholder="Search..." onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="w-full h-[80%] flex flex-col gap-0.5 justify-start items-start overflow-y-auto p-3  pt-0 overflow-x-hidden scrollbar">
                {gettingUsers && <Skeleton/>}
                {!gettingUsers&& (filteredUsers.length !== 0 ? filteredUsers.map((user) => {
                    return (
                       <Contacts user={user} search={search} setSearch={setSearch}/>
                    )
                }) : null)}
                
            </div>
        </div>
    )
}

export default ContactsList