import express from "express";
import { logIn, logOut, signUp } from "../controllers/authControllers.js";
const router = express.Router();
router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);

export { router as authRouter };
