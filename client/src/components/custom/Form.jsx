import React from 'react'
import { useState } from 'react';
import Input from './Input';
import validateForm from '../../utils/validateForm';
import { toast, ToastContainer } from "react-toastify"
import userSignUp from "../../services/userSignUp"
import "react-toastify/ReactToastify.css"
import useAuthStore from '../../store/authStore';
import { useNavigate,Link } from "react-router-dom"
import Spinner from './Spinner';
const Form = () => {
    const [loading,setLoading]=useState(false)
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",

    });
    const navigate = useNavigate()
    const setAuthUser = useAuthStore(state=>state.setAuthUser);
    const toastOptions={
        autoClose: 3000,
        draggable: true,
        theme: "dark",
        closeOnClick: true,
        position: "bottom-right",
        closeButton: false,
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { result, msg } = validateForm(form);
        if (!result) {
            toast.error(msg, toastOptions)
            return;
        }
        setLoading(true)
        const response = await userSignUp(form);
        setLoading(false);
        if (response.status !== 201) {
            toast.error(response.data?.msg ?? "Something went wrong",toastOptions )
            return;
        }
        else {
            toast.success("User Created",toastOptions)
            setTimeout(() => {
                setAuthUser(response.data);
                navigate("/chat")
            }, 2000);
           
        }


    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(form => ({
            ...form,
            [name]: value,
        }))
    }
    const inputFields = [{
        name: "username",
        type: "text",
        placeholder: "Username",
        value: form.username,
    },
    {
        name: "email",
        type: "text",
        placeholder: "Email",
        value: form.email,
    },
    {
        name: "password",
        type: "password",
        placeholder: "Password",
        value: form.password
    }
    ]
    return (
        <form onSubmit={handleSubmit} autoComplete='off'  className="flex justify-center items-center flex-col gap-4 w-full">
            {
                inputFields.map((val) => (

                    <Input val={val} key={val.placeholder} handleChange={handleChange} loading={loading}/>
                ))
            }


            <button type="submit" disabled={loading} style={{
                cursor:loading?"not-allowed" : "pointer",
                
            }} className="flex justify-center items-center bg-gradient-to-l from-indigo-500 to-indigo-800 p-2 text-white w-3/5 rounded-xl  disabled:cursor-not-allowed font-semibold hover:opacity-85 border-[1px] border-transparent active:scale-99 active:opacity-60 transition-all duration-200 shadow-[4px_4px_15px_rgba(0,0,0,0.4)] ">
                <h4 className="hover:scale-101 active:scale-99 transition-all duration-150">{loading?<Spinner/>:"Create Account"}</h4>
            </button>
            <div>
                <h4 className='text-white text-sm opacity-50 text-center'>
               <Link to="/login"> Already have an account? </Link>
                </h4></div>
            <ToastContainer />
        </form>
    )
}

export default Form