import { postMessage } from "../models/PostsMessage"

export const getPosts = async (req,res)=>{
    try {
        
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
    const title = req.query.title
    try {

        const posts = await postMessage.find({ title:{$regex:title,$options:'$i'} });
        console.log(posts);
        res.json({data:posts})
        
    } catch (error) {
        console.log(error);
    }

}
export const createPosts = async (req,res)=>{
    const newPost = new postMessage({...req.body,creator:req.userId,selectedFile:req.file?.filename,createdAt:new Date().toISOString()});
    try {
        if(newPost){
        await newPost.save();
        console.log(newPost);
        res.status(200).send(newPost)
        }
        else{
            res.status(400).json({message:"sdasdsa"})
        }
    } catch (error) {
        console.log(error);
    }
}


export const updatePosts = async (req,res)=>{
    const {id:_id } = req.params;
    console.log("updatedData",_id,req.body)

    try {
       const updatedPost = await postMessage.findByIdAndUpdate(_id,req.body,{new:true})
       res.json(updatedPost)
    } catch (error) {
        console.log(error);
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

export const commentPosts = async (req,res)=>{
    const {id} = req.params
    if(!req.userId) return res.json({message:"Unauthorized"})
    const comment = {
        content : req.body.content,
        postedBy:req.userId
    }
    console.log(req.body);
    const updatedPost = await postMessage.findByIdAndUpdate(id,{$push:{comments:comment}},{new:true})
    res.json(updatedPost)
    }   


export const getPostsByUser = async (req,res)=>{
    const {id } = req.params;
     const userPosts = await postMessage.find({creator:id})
     res.status(200).json(userPosts)
}


