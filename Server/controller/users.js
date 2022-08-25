import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { postMessage } from '../models/PostsMessage.js'
import { Users } from '../models/Users.js'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import { v4 as uuidv4 } from "uuid";
import path from 'path'
import { Otp } from '../models/Otp.js'
export const signin = async (req,res)=>{
    const {email,password} =  req.body
 
        const existingUser = await Users.findOne({email})

        if(!existingUser){
            return res.status(400).json({message:"EmailId is not found"})
        }
       
        else{
            const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)

            if(!isPasswordCorrect){
                return res.status(400).json("Password is incorrect")
            }
            
    
            const token = jwt.sign({email:existingUser.email,id:existingUser._id},'test')
            res.status(200).json({result:existingUser,token})
        }
        
       
    
    }

export const signup = async (req,res)=>{
    const {firstName,email,password,confirmPassword} =  req.body
    try {
        const existingUser = await Users.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"Email already exists"})
        }
        if(password!==confirmPassword){
           return res.status(400).json({message:"Password does not match"})
        }
        const hashedPassword = await bcrypt.hash(password,12)
        const User = new Users({email,password:hashedPassword,name:firstName,isVerified:false,emailToken:crypto.randomBytes(64).toString('hex')})
        const newUser = await User.save()
        const mailOptions = {
            from : "balajikrishna44589@gmail.com",
            to:User.email,
            subject:"verify your email",
            html:`<p>Hello ${User.name} Verify your email address to complete the signup and login to your account</p>
            <p>press <a href="http://${req.headers.host}/users/verify-email?token=${User.emailToken}"> here</a> to proceed </p>`,
        }
        transporter.sendMail(mailOptions,function (error,info){
            if(error){
                console.log(error);
            }
            else{
                console.log("Verification Mail sent");
            }
        })

    } catch (error) {
        console.log(error)
    }
}

export const emailVerify = async(req,res) =>{
    try {
        const token = req.query.token
        const user = await Users.findOne({emailToken:token})
        if(user){
            user.emailToken = null
            user.isVerified = true
            await user.save()
            res.redirect("http://localhost:3000/auth")
        }
        else{
            console.log("Email is not verified");
        }
    } catch (error) {
        console.log(error);
    } 
}

export const verifyPasswordMail = async(req,res) =>{
        const User = await Users.findOne({email:req.body.email})
        if(User){
            let otpCode = Math.floor((Math.random()*10000)+1)
            let otpData = new Otp({
                email:req.body.email,
                code:otpCode,
                expiresIn:new Date().getTime()+300*1000
            })
            await otpData.save()
            const mailOptions = {
                from : "balajikrishna44589@gmail.com",
                to:User.email,
                subject:"verify your email",
                html:`<p>Hello ${User.name} your OTP is ${otpData.code}`,
            }
            transporter.sendMail(mailOptions,function (error,info){
                if(error){
                    console.log(error);
                }
                else{
                    console.log("Verification Mail sent");
                }
            })}
        else{
            return res.status(400).json("error")
        }
       
}

export const changePassword = async(req,res)=>{
    let data = await Otp.findOne({email:req.body.email,code:req.body.code})
   
    if(data){
        let currentTime = new Date().getTime()
        let diff = data.expiresIn - currentTime
        if(diff<0){
            return res.status(400).json("error")
        }
        else{
            const User = await Users.findOne({email:req.body.email})
            const hashedPassword = await bcrypt.hash(req.body.password,12)
            User.password = hashedPassword
            User.save();
            res.status(200).json("Password Changed")
        }}
        else{
            return res.json(400).json("Error")
        }
    }



export const verifyEmail = async(req,res,next) =>{
const user = await Users.findOne({email:req.body.email})
if(user.isVerified){
    next();
}
else{
    console.log("Please Check your mail");
}
}
export const updateProfile = async (req,res)=>{
    try {
        const existingUser = await Users.findById(req.userId)
      if(existingUser){
      existingUser.name = req.body.name || existingUser.name;
      existingUser.email = req.body.email || existingUser.email;
      await existingUser.save();
      console.log(existingUser);
        return  res.status(200).json({ result:existingUser})
    } }catch (error) {
        console.log(error)
    }
}

export const getMyProfile = async(req,res) =>{
    try {
        const existingUser = await Users.findById(req.userId)
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},'test')
        if(existingUser){
            return  res.status(200).json({ result:existingUser,token})
        }  
    } catch (error) {
        
    }
}

export const GoogleSignIn = async (req,res)=>{
    
    const {email,name,token,googleId} =  req.body
 try{
        const existingUser = await Users.findOne({email})
        if(existingUser.isVerified){
            res.send("error")
        }
if(existingUser){
    res.status(200).json({result:existingUser,token})
}
if(!existingUser){       
    const result = await Users.create({
            email,
            name,
            googleId
        })
        res.status(200).json({result,token})
    }
 }
 catch(err){
    console.log(err);
 }
    }

export const getOthersPosts = async (req,res)=>{

        Users.findOne({_id:req.params.id}).select("-password")
        .then((user) => {
            postMessage.find({creator:req.params.id}).populate("creator","_id name").exec((err,posts)=>{
                if(posts){
                    res.json({user,posts})
                }
            })
        })
        .catch(err => {return res.status(400).send(err)});
    }
    
export const getOthersGooglePosts = async (req,res)=>{

    Users.findOne({googleId:req.params.id}).select("-password")
    .then((user) => {
        postMessage.find({creator:req.params.id}).populate("creator","_id googleId").exec((err,posts)=>{
            if(posts){
                res.json({user,posts})
            }
        })
    })
    .catch(err => {return res.status(400).send(err)});
}
var transporter = nodemailer.createTransport({
service:"gmail",
auth:{
    user:"balajikrishna44589@gmail.com",
    pass:"gjvkdihwboxlykyz"
}
})


