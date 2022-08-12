import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String},
    googleId:{type:String},
    id:{type:String}
})
export const Users = mongoose.model("User",userSchema)