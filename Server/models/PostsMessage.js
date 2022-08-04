import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    tags:Array,
    selectedFile:String,
    likeCount:{type:Number,default : 0},
    createdAt:{
        type:Date,
        default:new Date()
    }
})
export const postMessage = mongoose.model("postMessage",postSchema)