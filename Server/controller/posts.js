import { postMessage } from "../models/PostsMessage.js"

export const getPosts = async (req,res)=>{
    // const {title,tags} = req.query
    // console.log(title);
    try {
        // if(title){
        //     const posts = await postMessage.find({ $or:[{title},{tags:{$in:tags.split(',')} }] });
        //     console.log(posts);
        //    return res.json({data:posts})
        // }
        const postMessages = await postMessage.find();
       
        res.send(postMessages)
    } catch (error) {
        
    }
}

export const getPost = async (req,res)=>{
    const {id} = req.params
    try {
        const postMessages = await postMessage.findById(id);
        console.log(postMessages);
        res.send(postMessages)
    } catch (error) {
        
    }
}

export const getPostsBySearch = async (req,res)=>{
    const {title,tags} = req.query
    try {

        // const title = new RegExp(searchQuery,'i')     
        const posts = await postMessage.find({ $or:[{title},{tags:{$in:tags.split(',')} }]});
        console.log(posts);
        res.json({data:posts})
        
    } catch (error) {
        console.log(error);
    }

}
export const createPosts = async (req,res)=>{
    const newPost = new postMessage({...req.body,creator:req.userId,createdAt:new Date().toISOString()});
    try {
        await newPost.save();
        res.send(newPost)
    } catch (error) {
        
    }
}
export const updatePosts = async (req,res)=>{
    const {id:_id } = req.params;
    try {
       const updatedPost = await postMessage.findByIdAndUpdate(_id,req.body,{new:true})
       res.json(updatedPost)
    } catch (error) {
        
    }
}
export const deletePosts = async (req,res)=>{
    const {id } = req.params;
    try {
       await postMessage.findByIdAndRemove(id)
       res.json({message:"Message Deleted Successfully"})
    } catch (error) {
        
    }
}
export const likePosts = async (req,res)=>{
    const {id } = req.params;
        if(!req.userId) return res.json({message:"Unauthorized"})
       const post = await postMessage.findById(id)
       const index = post.likes.findIndex((id)=>id===String(req.userId))
       if(index===-1){
         post.likes.push(req.userId)
       }
       else{
        post.likes = post.likes.filter((id)=>id!==String(req.userId))
       }
       const updatedPost = await postMessage.findByIdAndUpdate(id,post,{new:true})
       res.json(updatedPost)
}