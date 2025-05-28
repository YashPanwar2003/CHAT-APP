import LoginForm from "../components/custom/LoginForm";
import { useEffect } from "react";
import userCheck from "../services/userCheck";
import { useNavigate } from "react-router-dom";
import Card from "../components/custom/AuthCard";
//signup functionalities are almost done
export default function Login() {
  const navigate = useNavigate()
  useEffect(() => {
     const fetchUser= async ()=> {
      try {
        await userCheck();
        navigate("/chat")
      } catch (err) {
        if (err.response?.status === 401) console.log("User Unauthorized")
        else {
          console.log(err.response?.data?.msg)
        }
      }
    }
    fetchUser().catch(err=>console.log("Unhandled Error : "+err.message))
  }, [])

  return (
   <Card AuthForm={LoginForm}/>
  );
}
