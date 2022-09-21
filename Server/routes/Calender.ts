import express from "express";
import { createEvent } from "../controller/calender";
const router = express.Router();

router.post("/createEvent",createEvent)
router.get("/getEvent",createEvent)
export default router;
