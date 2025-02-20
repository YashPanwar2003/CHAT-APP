import Form from "../components/custom/Form";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import userCheck from "../services/userCheck";
import { useNavigate } from "react-router-dom";
//signup functionalities are almost done
export default function SignUp() {

  const {setAuthUser,authUser}=useAuthStore()
  const navigate=useNavigate()
  useEffect(()=>{
    async function fetch(){
      const result=await userCheck();
      const statusCodes=[400,401,402,500];
      if(statusCodes.includes(result.status)){
        throw new Error(result.statusText)
      }
      return result.data;

    }
    fetch().then(user=>{
      setAuthUser(user);
      navigate("/chat")
    }).catch(arg=>console.log(arg));
     

  },[])

  return (
    <main className="h-screen w-screen flex justify-center bg-gradient-to-b from-indigo-500 to-indigo-800 items-center ">
      <div className="h-3/4 w-3/5 bg-slate-800  rounded-2xl flex flex-col justify-center lg:grid lg:grid-cols-2 shadow-[4px_4px_25px_rgba(0,0,0,0.5)] ">
        <div className="flex justify-center items-center flex-col gap-4 ">
          <Form/>
        </div>
        <div>
          
        </div>
      </div>
    </main>
  );
}
