import express from "express"
import {upload} from "../middleware/multerMiddleware.js"
import { updateProfilePicture,checkAuth,getUsers, getMessages } from "../controllers/userControllers.js";
const router = express.Router()
router.post("/updateProfile",upload.single("profilePic"),updateProfilePicture);
router.get("/check",checkAuth);
router.get("/getUsers",getUsers)
router.post("/messages",getMessages)
export { router as userRouter}