import { useState } from "react";
import userSignUp from "../../services/userSignUp"

import Form from './AuthForm';
const SignUpForm = () => {
   const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",

    });
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
       <Form inputFields={inputFields} authService={userSignUp} form={form} setForm={setForm} alternateUrl={"/login" } linkButtonProps={"Already have an account?"} submitButtonProps={"SignUp"} />
    )
}

export default SignUpForm