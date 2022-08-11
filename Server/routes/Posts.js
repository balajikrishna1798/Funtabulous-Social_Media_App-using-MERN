import express from "express";
import { createPosts, deletePosts,getPost, getPosts,updatePosts ,getPostsBySearch, likePosts} from "../controller/posts.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

//Get all Posts
router.get('/search',getPostsBySearch)
router.get('/',getPosts)

//Get Post with Id
router.get('/:id',getPost)

router.get('/search',getPostsBySearch)

router.post('/',auth,createPosts)

router.patch('/:id',auth,updatePosts)

router.delete('/:id',auth,deletePosts)

router.patch('/:id/likePost',auth,likePosts)

export default router