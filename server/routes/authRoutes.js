import express from "express"
import { logIn, logOut, signUp } from "../controllers/authControllers.js"

import protectRoute from "../middleware/authMiddleware.js"
const router=express.Router()
router.post("/signup",signUp)
router.post("/login",logIn)
router.post("/logout",logOut)
router.post("/updatepic",protectRoute,(req,res)=>{
    return res.send("hello")
})

export {router as authRouter};