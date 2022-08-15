import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:String,
    name:String,
    message:String,
    creator:String,
    tags:Array,
    comments:{type:Array,default:[]},
    selectedFile:String,
    likes:{type:Array,default : []},
    createdAt:{
        type:Date,
        default:new Date()
    }
})
export const postMessage = mongoose.model("postMessage",postSchema)