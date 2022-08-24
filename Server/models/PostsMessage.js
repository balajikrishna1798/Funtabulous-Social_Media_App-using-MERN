import mongoose from "mongoose";
const  { ObjectId } = mongoose.Schema.Types
const postSchema = mongoose.Schema({
    title:String,
    name:String,
    message:String,
    creator:String,
    tags:Array,
    selectedFile:String,
    likes:{type:Array,default : []},
    createdAt:{
        type:Date,
        default:new Date()
    },
    comments:[{
        content:String,
        postedBy:{type:String,ref:"Users"}
    }]
})
export const postMessage = mongoose.model("postMessage",postSchema)