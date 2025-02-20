import React from 'react'
import { UserRound, KeyRound, Mail } from "lucide-react"
const Input = ({val:{ name, type, placeholder, value},handleChange,loading}) => {
    return (


       
        <input
            id={name}
            name={name}
            onChange={handleChange}
            type={type}
            disabled={loading}
            style={{
               cursor:loading?"not-allowed":"text",
            }}
            autoComplete="off"
            className=" bg-gradient-to-r  from-slate-700 to-slate-600 rounded-xl placeholder:text-sm placeholder:text-gray-400 text-opacity-50 py-3 px-3 text-white font-semibold text-md w-3/5 border-[1px] border-transparent  focus:border-gray-300 focus:outline-none transition-all duration-150 font-sans shadow-[4px_4px_15px_rgba(0,0,0,0.4)]"
            placeholder={placeholder}
            value={value}
        />


    )
}

export default Input