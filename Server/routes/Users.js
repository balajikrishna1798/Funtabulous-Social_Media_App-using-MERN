import express from "express";
import { GoogleSignIn, signin, signup,updateProfile,getOthersPosts,getOthersGooglePosts, getMyProfile,emailVerified, verifyUser,verifyPasswordMail, changePassword, searchUsers} from "../controller/users.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

//routes for users
router.post("/signin",verifyUser, signin)
router.post("/signup",signup)
router.post("/googleSignIn",GoogleSignIn)
router.post("/profile",auth,updateProfile)
router.get("/profile",auth,getMyProfile)
router.get("/usersProfile/:id",auth,getOthersPosts)
router.get("/googleusersProfile/:id",auth,getOthersGooglePosts)
router.get("/verify-email",emailVerified)
router.post("/verifypasswordmail",verifyPasswordMail)
router.post("/changePassword",changePassword)
router.post("/searchUsers",searchUsers)



export default router;