import express from "express";
import { createPosts,getPost, deletePosts, getPosts,updatePosts , likePosts, getPostsBySearch, getPostsByUser,commentPosts} from "../controller/posts.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.get('/search',getPostsBySearch)
router.get('/',getPosts)
router.get('/:id',getPost)
router.post('/',auth,createPosts)
router.get('/userPosts/:id',auth,getPostsByUser)
router.patch('/:id',auth,updatePosts)
router.delete('/:id',auth,deletePosts)
router.patch('/:id/likePost',auth,likePosts)
router.patch('/:id/comments',auth,commentPosts)



export default router