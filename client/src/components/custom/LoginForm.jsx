import { useState } from 'react';
import userLogin from '../../services/userLogin';
import Form from './AuthForm';

const LoginForm = () => {
   
    const [form, setForm] = useState({
        email: "",
        password: "",

    });
   
    const inputFields = [
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
        <Form inputFields={inputFields} form={form} setForm={setForm} authService={userLogin} alternateUrl={"/signup"} linkButtonProps={"Don't have an Account?"} submitButtonProps={"Login"}/>
    )
}

export default LoginForm