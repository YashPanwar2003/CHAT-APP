import { Schema, model } from "mongoose";
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 12,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select:false,
  },
  profilePic:{
    type:String,
    default:"",
  }
},{timestamps:true});
const User=model("User",userSchema)
export default User;
