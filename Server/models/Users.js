import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String},
    googleId:{type:String},
    emailToken:{type:String},
    id:{type:String},
    isVerified : Boolean
})
export const Users = mongoose.model("User",userSchema)