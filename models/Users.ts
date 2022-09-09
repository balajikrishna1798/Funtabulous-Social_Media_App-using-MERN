import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    pic:{type:String},
    password:{type:String},
    googleId:{type:String},
    emailToken:{type:String},
    id:{type:String},
    isVerified : Boolean
})
export const Users = mongoose.model("User",userSchema)