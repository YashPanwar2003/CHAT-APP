import express from "express"
import {uploadProfilePic} from "../middleware/multerMiddleware.js"
import { updateProfilePicture,checkAuth,getUsers, getMessages,deleteUser } from "../controllers/userControllers.js";
const router = express.Router()
router.post("/updateProfile",uploadProfilePic,updateProfilePicture);
router.get("/check",checkAuth);
router.get("/getUsers",getUsers)
router.post("/messages",getMessages)
router.delete("/delete/:id",deleteUser)

export { router as userRouter}