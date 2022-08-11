import express from "express";
import { signin, signup} from "../controller/users.js";
const router = express.Router();

//routes for users
router.post("/signin",signin)
router.post("/signup",signup)

export default router;