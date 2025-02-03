import User from "../model/user.model.js";
import statusCode from "../utils/statusCode.js";
import { generateHash, compareHash } from "../utils/hashUtils.js";
import { generateToken } from "../utils/jwtUtils.js";

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res
        .status(statusCode.invalid)
        .json({ msg: "All fields are required" });
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res
        .status(statusCode.invalid)
        .json({ msg: "username exist already" });
    }
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res
        .status(statusCode.invalid)
        .json({ msg: "email already registered" });
    }
    if (password.length < 6) {
      return (
        res.status(statusCode.invalid) /
        json({ msg: "password must be 6 characters long" })
      );
    }
    const hashedPassword = await generateHash(password);
    const user = await User.create({
      username,
      email,
      password:hashedPassword,
    });
    
    if (user) {
      const token = generateToken(user._id);
      res.cookie("jwt", token, {
        maxAge: 5 * 24 * 3600 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.Node_ENV !== "development",
      });
      const userObject=user.toObject();
      delete userObject.password;
      return res.status(statusCode.userCreated).json(userObject);
    } else {
      return res
        .status(statusCode.serverError)
        .json({ msg: "something went wrong" });
    }
  } catch (error) {
    console.log("internal error", error.message);
    return res
      .status(statusCode.serverError)
      .json({ msg: "Internal Server error" });
  }
};
export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(statusCode.invalid)
        .json({ msg: "All fields are required" });
    }
    const user = await User.findOne({ email }).select("+password").lean();
    if (!user) {
      return res
        .status(statusCode.invalid)
        .json({ msg: "email not registered" });
    }
    
    const matchPassword =await compareHash(password, user.password);
    if (matchPassword) {
      const token=generateToken(user._id);
      res.cookie("jwt",token,{
        maxAge:5*24*360*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.Node_ENV!=="development"
      })
      delete user.password;
      return res.status(statusCode.userCreated).json(user);
    }else{
        return res
        .json(statusCode.invalid)
        .json({ msg: "Invalid email or password" });
    }

  } catch (err) {
    console.log("error name : "+ err.message)
    return res.status(statusCode.serverError).json({msg:"Internal Server error"})
  }
};
export const logOut = async (req, res) => {
    try{   
        res.cookie("jwt",null,{maxAge:0,httpOnly:true,sameSite:"strict"})
        return res.status(statusCode.success).json({msg:"logged out your account"})
    }catch(err){
        console.log("error name : "+err.message)
        return res.status(statusCode.serverError).json({msg:"can't log out now"})
    }
};
