import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { postMessage } from '../models/PostsMessage.js'
import { Users } from '../models/Users.js'

export const signin = async (req,res)=>{
    const {email,password} =  req.body
 
        const existingUser = await Users.findOne({email})

        if(!existingUser){
            return res.status(400).json({message:"EmailId is not found"})
        }

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)

        if(!isPasswordCorrect){
            return res.status(400).json("Password is incorrect")
        }
        
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},'test')
        res.status(200).json({result:existingUser,token})
    
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
        const result = await Users.create({email,password:hashedPassword,name:firstName})
        const token = jwt.sign({email:result.email,id:result._id},'test')
        res.status(200).json({result,token})
    } catch (error) {
        console.log(error)
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
