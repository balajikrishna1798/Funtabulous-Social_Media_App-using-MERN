import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema({
  members:{
    type:Array
  }
})
export const conversation = mongoose.model("conversation",conversationSchema)