const validateForm = ({ username, email, password }) => {
    if(!username || !email || !password){
        return {result:false, msg:"All fields are required"}
    }
    if (username.trim().length < 6) {
        return { result: false, msg: "Username too short" };
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
        return { result: false, msg: "Enter a valid Email" }
    }
    if(password.length<6){
        return {result:false,msg:"Password is short"}
    }
    return { result: true };
}
export default validateForm;