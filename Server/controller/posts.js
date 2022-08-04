import { postMessage } from "../models/PostsMessage.js"

export const getPosts = async (req,res)=>{
    try {
        const postMessages = await postMessage.find();
        console.log(postMessages);
        res.send(postMessages)
    } catch (error) {
        
    }

}
export const createPosts = async (req,res)=>{
    const newPost = new postMessage(req.body);
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
    try {
       const post = await postMessage.findById(id)
       const updatedPost = await postMessage.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true})
       res.json(updatedPost)
    } catch (error) {
        
    }
}