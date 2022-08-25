import express from "express";
import { GoogleSignIn, signin, signup,updateProfile,getOthersPosts,getOthersGooglePosts, getMyProfile,emailVerify, verifyEmail,verifyPasswordMail, changePassword} from "../controller/users.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

//routes for users
router.post("/signin",verifyEmail, signin)
router.post("/signup",signup)
router.post("/googleSignIn",GoogleSignIn)
router.post("/profile",auth,updateProfile)
router.get("/profile",auth,getMyProfile)
router.get("/usersProfile/:id",auth,getOthersPosts)
router.get("/googleusersProfile/:id",auth,getOthersGooglePosts)
router.get("/verify-email",emailVerify)
router.post("/verifypasswordmail",verifyPasswordMail)
router.post("/changePassword",changePassword)


export default router;