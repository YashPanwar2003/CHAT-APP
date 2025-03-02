import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import userCheck from '../services/userCheck'
import useAuthStore from '../store/authStore'
import ContactsList from '../components/custom/ContactsList'
import ChatBox from '../components/custom/ChatBox'

import { toast, ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"
const Chat = () => {
  const {authUser,socket,setAuthUser,initSocket,disSocket } = useAuthStore()
  const navigate = useNavigate()
  const toastOptions = {
    autoClose: 3000,
    draggable: true,
    theme: "dark",
    closeOnClick: true,
    position: "top-center",
    closeButton: false,
  }
  useEffect(() => {
    if(authUser) return;
    //if the auth user is not null it means we came from the signup page 
    async function fetch() {
      const result = await userCheck();
      if ([400, 401, 500].includes(result.status)) {
        throw new Error(result.statusText)
      }
      return result?.data;
    }
    fetch().then(user => {
      setAuthUser(user)
      initSocket(()=>{
        toast.success("Connected!",toastOptions)
      })
    }).catch(err => {
      if (err) {
        console.log(err)
        navigate("/signup");
      }
    })

    return disSocket(socket);

  }, [authUser])
  return (
    <main className="h-screen w-screen flex justify-center bg-gradient-to-b from-sky-400 to-blue-800 items-center ">
      <div className="h-4/5 w-3/5 bg-slate-800  rounded-2xl flex  shadow-[4px_4px_25px_rgba(0,0,0,0.8)] ">
        <ContactsList />
        <ChatBox />
        <ToastContainer limit={1} />
      </div>
    </main>
  )
}

export default Chat