import SignUpForm from "../components/custom/SignUpForm";
import { useEffect } from "react";
import userCheck from "../services/userCheck";
import { useNavigate } from "react-router-dom";
import Card from "../components/custom/AuthCard";
//signup functionalities are almost done
export default function SignUp() {

  const navigate=useNavigate()
  useEffect(()=>{
   const checkAuth=async ()=>{
      try {
        await userCheck();
        navigate("/chat")
      } catch (err) {
       if(err.response?.status===401){
         console.log("User unauthorized")
       }else 
          console.log(err.response?.data?.msg)
      }
    
    }
    checkAuth().catch(err=>console.log("Unhandled Error : "+err.message))

  },[])

  return (
      <Card AuthForm={SignUpForm}/>
  );
}
