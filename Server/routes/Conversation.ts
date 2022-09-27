import express from "express";
import { Conversation, findUserId, userId } from "../controller/Conversation";


const router = express.Router();


router.post('/',Conversation)
router.get('/:userId',userId)
router.get('/find/:firstUserId/:secondUserId',findUserId)



export default router