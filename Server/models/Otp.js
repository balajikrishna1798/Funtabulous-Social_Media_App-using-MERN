import mongoose from "mongoose";

const OtpSchema = mongoose.Schema({

    email:{type:String},
    code:{type:String},
    expiresIn:{type:Number}
},{
    timeStamps:true
})
export const Otp = mongoose.model("Otp",OtpSchema)