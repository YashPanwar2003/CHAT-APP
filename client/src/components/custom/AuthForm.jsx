import { useState } from 'react';
import Input from '../ui/Input';
import toastOptions from "../../utils/toastOptions"
import validateForm from '../../utils/validateForm';
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"
import { useNavigate, Link } from "react-router-dom"
import Spinner from '../ui/Spinner';
const Form = ({inputFields,authService,form,setForm, alternateUrl, linkButtonProps, submitButtonProps}) => {
    const [loading, setLoading] = useState(false)
    
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { result, msg } = validateForm(form);
            if (!result) {
               throw new Error(msg)
            }
            setLoading(true)
            const response = await authService(form);
            setLoading(false);
            toast.success(response.data?.msg, toastOptions)
            setTimeout(() => {
                navigate("/chat")
            }, 1000);

        } catch (err) {
            const errorMessage = err.response?.data?.msg || err.message
            toast.error(errorMessage, { ...toastOptions, toastId: errorMessage })
        }


    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(form => ({
            ...form,
            [name]: value,
        }))
    }
    return (
        <form onSubmit={handleSubmit} autoComplete='off' className="flex justify-center items-center flex-col gap-4 w-full">
            {
                inputFields.map((val) => (

                    <Input inputAttributes={val} key={val.placeholder} handleChange={handleChange} loading={loading} />
                ))
            }


            <button type="submit" disabled={loading} style={{
                cursor: loading ? "not-allowed" : "pointer",

            }} className="flex justify-center items-center bg-gradient-to-b from-indigo-800 to-indigo-900 p-3 text-white w-3/5 rounded-lg  disabled:cursor-not-allowed font-semibold hover:opacity-85 border-[1px] border-transparent active:scale-99 active:opacity-60 transition-all duration-200 shadow-[4px_4px_15px_rgba(0,0,0,0.4)] ">
                <h4 className="hover:scale-101 active:scale-99 transition-all duration-150">{loading ? <Spinner /> : submitButtonProps}</h4>
            </button>
            <div>
                <h4 className='text-white text-sm opacity-50 text-center'>
                    <Link to={alternateUrl}> {linkButtonProps} </Link>
                </h4></div>
            <ToastContainer limit={1} />
        </form>
    )
}

export default Form