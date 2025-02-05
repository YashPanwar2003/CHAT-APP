import express from "express"
import upload from "../middleware/multerMiddleware.js";
import { updateProfilePicture } from "../controllers/userControllers.js";
const router = express.Router()

router.post("/updateProfile",upload.single("profilePic"),updateProfilePicture);

export { router as userRouter}