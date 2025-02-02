import { Schema, model } from "mongoose";
const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
    min: 6,
    max: 12,
  },
  password: {
    type: String,
    require: true,
    min: 6,
    select:false,
  },
  profilePic:{
    type:String,
    default:"",
  }
},{timestamps:true});
const User=model("User",userSchema)
export default User;
