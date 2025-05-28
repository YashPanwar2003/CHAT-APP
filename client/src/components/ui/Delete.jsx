import { Trash } from "lucide-react"
import { useState } from "react"
import ReactDOM from "react-dom"
import useAuthStore from "../../store/authStore"
import deleteUserAccount from "../../services/deleteUser"
import {useNavigate} from "react-router-dom"
import Spinner from "../ui/Spinner"

export default function DeleteAccount() {
    const navigate=useNavigate()
    const {authUser}=useAuthStore()
    const [modalOpen, setModalOpen] = useState(false)
    const [isDeleting,setDeleting]=useState(false)

    const handleDelete =async (e) => {
        try{
            setDeleting(true)
           const {_id}= authUser
           const {data}= await deleteUserAccount(_id)
           if(data.result){
             setModalOpen(false)
              setTimeout(() => {
                navigate("/signup")
              }, 200);
           }
        }catch(err){
            
        }finally{
            setDeleting(false)
        }
    }

    return (
        <div>
            <button
                onClick={() => setModalOpen(true)}
                className="text-red-700 text-sm flex justify-start items-center gap-4 cursor-pointer w-full hover:bg-red-700 hover:text-white p-2 py-3 rounded-xl transition-all duration-200 ">
                <Trash className="size-sm" />
                <h4 className="font-medium text-sm">Delete Account</h4>

            </button>
            <DeleteModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onConfirm={handleDelete} isDeleting={isDeleting} />

        </div>
    )
}

const DeleteModal = ({ isOpen, onClose, onConfirm,isDeleting }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-transparent bg-opacity-50">
            <div className="bg-neutral-800 w-[90%] max-w-md p-6 rounded-xl shadow-2xl text-left">
                <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
                <p className="mb-6">This action will delete all the user data and chat history.</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded text-black font-medium hover:bg-gray-400 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                    >
                      {isDeleting ? <Spinner/> : "Delete" }
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}