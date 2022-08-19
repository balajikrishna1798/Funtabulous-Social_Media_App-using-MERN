import express from "express";
import { GoogleSignIn, signin, signup,updateProfile} from "../controller/users.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

//routes for users
router.post("/signin",signin)
router.post("/signup",signup)
router.post("/googleSignIn",GoogleSignIn)
router.post("/profile",auth,updateProfile)

export default router;