import express from "express";
import { GoogleSignIn, signin, signup} from "../controller/users.js";
const router = express.Router();

//routes for users
router.post("/signin",signin)
router.post("/signup",signup)
router.post("/googleSignIn",GoogleSignIn)
export default router;