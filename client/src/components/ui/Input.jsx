import React from 'react'
import { UserRound, KeyRound, Mail } from "lucide-react"
const Input = ({inputAttributes:{ name, type, placeholder, value},handleChange,loading}) => {
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
            className="bg-neutral-800 rounded-lg placeholder:text-sm placeholder:text-gray-400 text-opacity-50 py-3 px-3 text-white font-semibold text-md w-3/5 border-[1px] border-transparent  focus:border-gray-300 focus:outline-none transition-all duration-150 font-sans shadow-[4px_4px_15px_rgba(0,0,0,0.4)]"
            placeholder={placeholder}
            value={value}
        />


    )
}

export default Input