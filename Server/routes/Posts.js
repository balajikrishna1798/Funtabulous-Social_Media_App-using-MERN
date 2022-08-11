import express from "express";
import { createPosts,getPost, deletePosts, getPosts,updatePosts , likePosts, getPostsBySearch} from "../controller/posts.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.get('/search',getPostsBySearch)
router.get('/',getPosts)
router.get('/:id',getPost)

router.post('/',auth,createPosts)
router.patch('/:id',auth,updatePosts)
router.delete('/:id',auth,deletePosts)
router.patch('/:id/likePost',auth,likePosts)

export default router