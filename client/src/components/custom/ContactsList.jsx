// import users from "../../utils/userData"
import { useEffect, useMemo, useState } from "react"
import useChatStore from "../../store/chatStore"
import Contacts from "./Contacts"
import Skeleton from "../ui/Skeleton"
import getAllUsers from "../../services/getUsers"
import Sidebar from "./Sidebar"


const ContactsList = () => {
    const { gettingUsers, setGettingUsers, users, setUsers } = useChatStore()

    const [search, setSearch] = useState("")
    const [sidebar,setSidebar]=useState(false)
    const filteredUsers = useMemo(() => users.filter(val => val.username.toLowerCase().startsWith(search.toLowerCase().trim())), [users, search])
    useEffect(() => {
        async function fetch() {
            const result = await getAllUsers()
            if (result.status === 500) {
                throw new Error("something went wrong")
            }
            return result?.data
        }
        setGettingUsers(true)
        fetch().then(fetchedUsers => {
            setUsers(fetchedUsers)
            console.log(fetchedUsers)
        }).catch(err => console.log(err)).finally((() => setGettingUsers(false)))
    },[])
    return (

        <div className="md:w-full sm:w-fit h-full relative  flex flex-col col-span-1 overflow-hidden justify-center p-1 gap-4 max-w-[30%]">
            <div className="h-[13%] w-full flex px-3 justify-center items-center  gap-2 ">
                <Sidebar />
                <input className="bg-gray-800 rounded-2xl sm:hidden md:block px-3 py-2 w-3/4 text-sm" type="text" value={search} placeholder="Search..." onChange={e => setSearch(e.target.value)} />
            </div>
            <div  className="w-full h-[80%] flex flex-col gap-0.5 justify-start items-start overflow-y-scroll p-3 pt-0 overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-slate-800">
                {gettingUsers && <Skeleton />}
                {!gettingUsers && (filteredUsers.length !== 0 ? filteredUsers.map((user) => {
                    return (
                        <Contacts user={user} search={search} key={user.email} setSearch={setSearch} />
                    )
                }) : null)}

            </div>
        </div>
    )
}

export default ContactsList