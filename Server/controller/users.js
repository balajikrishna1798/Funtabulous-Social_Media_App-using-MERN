import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { postMessage } from '../models/PostsMessage.js'
import { Users } from '../models/Users.js'
import nodemailer from 'nodemailer'
import { userVerification } from '../models/userVerification.js'
import crypto from 'crypto'
import { v4 as uuidv4 } from "uuid";
import path from 'path'
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


const sendVerificationEmail = ({_id,email},res) =>{
    const currentUrl = "http://localhost:5000/"
    const uniqueString = uuidv4() + _id
   
    bcrypt.hash(uniqueString,10).then((hashedUniqueString)=>{
        const newVerifiation = new userVerification({
            userId :_id,
            uniqueString:hashedUniqueString,
            createdAt:Date.now(),
            expiresAt:Date.now()+2160000
        })
        newVerifiation.save().then(()=>{
            transporter.sendMail(mailOptions).then(()=>{
                res.json({
                    status:"pending",
                    message:"verification Email Sent"
                })
            })
        }).catch((error)=>{
            console.log(error);
        })
    })
}
export const emaisdlVerify = async (req,res) =>{
    let {userId,uniqueString} = req.params
    userVerification.find({userId})
    .then((result)=>{
        if(result.length>0){
            const {expiresAt} = result[0];
            const hashedUniqueString = result[0].uniqueString;

        if(expiresAt<Date.now()){
            userVerification.deleteOne({userId})
            .then(result=>{
                Users.deleteOne({_id:userId})
                .then(()=>{
                    let message = "Link has expired.Please Sign up again"
                    res.redirect(`/user/verified/error=true&message=${message}`)
                })
            .catch((error)=>{
                let message = "Clearing user with expired unique String failed"
                res.redirect(`/user/verified/error=true&message=${message}`)
            })
            })
        .catch((error)=>{
            console.log(error);
            let message = "An error occured while clearing expired user Verification record"
            res.redirect(`/user/verified/error=true&message=${message}`)
        })
    }else{
        bcrypt.compare(uniqueString,hashedUniqueString)
        .then(result=>{
            if(result){
        Users.updateOne({_id:userId},{verified:true})
        .then(()=>{
            userVerification.deleteOne({userId})
            .then(()=>{
                res.sendFile(path.join(__dirname,"./../views/verified.html"))
            })
            .catch((error)=>{
                console.log(error);
                let message = "An error occured while finalizing successfull verification"
                 res.redirect(`/user/verified/error=true&message=${message}`)
            })
        })
        .catch(error=>{
            console.log(error);
            let message = "An error occured while updating user record to show verified"
            res.redirect(`/user/verified/error=true&message=${message}`)
})

            }else{
                let message = "Invalid verification Details passed.Check your inbox"
                res.redirect(`/user/verified/error=true&message=${message}`)
            }
        })
        .catch(error=>{
            let message = "An error occured while comparing unique Strings"
            res.redirect(`/user/verified/error=true&message=${message}`)
        })
    }
}
     else{
        let message = "Account record doesnot exist or has been verified already.Pleas Signup or Login."
        res.redirect(`/user/verified/error=true&message=${message}`)
     }
    }).catch((error)=>{
        console.log(error);
        let message = "An error occured while checking for existing user verification record"
        res.redirect(`/user/verified/error=true&message=${message}`)
    })
}
export const emailVerified = async (req,res) =>{
  res.sendFile(path.join(__dirname,"./../views/verified.html"))
}
