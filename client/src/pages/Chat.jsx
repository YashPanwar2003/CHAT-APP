import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import userCheck from '../services/userCheck'
import useAuthStore from '../store/authStore'
import ContactsList from '../components/custom/ContactsList'
import ChatBox from '../components/custom/ChatBox'
const Chat = () => {
  const { authUser, setAuthUser } = useAuthStore()
  const navigate = useNavigate()
  useEffect(() => {
    if (authUser) return;
    async function fetch() {
      const result = await userCheck();
      if ([400, 401, 500].includes(result.status)) {
        throw new Error(result.statusText)
      }
      return result?.data;
    }
    fetch().then(user => setAuthUser(user)).catch(err => {
      if (err) {
        console.log(err)
        navigate("/chat");
      }
    })

  },[])
  return (
    <main className="h-screen w-screen flex justify-center bg-gradient-to-b from-indigo-500 to-indigo-800 items-center ">
      <div className="h-4/5 w-3/5 bg-slate-800  rounded-2xl flex  shadow-[4px_4px_25px_rgba(0,0,0,0.5)] ">
          <ContactsList/>
          <ChatBox/>
      </div>
    </main>
  )
}

export default Chat