import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Users } from '../models/Users.js'

export const signin = async (req,res)=>{
    const {email,password} =  req.body
    try {
        const existingUser = await Users.findOne({email})

        if(!existingUser){
            return res.status(404).json({message:"EmailId is not found"})
        }

        isPasswordCorrect = await bcrypt.compare(password,existingUser.password)

        if(!isPasswordCorrect){
            return res.status(400).json("Password is incorrect")
        }
        
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},'test')
        res.status(200).json({result:existingUser,token})
    } catch (error) {
        console.log(error);
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
        const result = await Users.create({email,password:hashedPassword,name:firstName})
        const token = jwt.sign({email:result.email,id:result._id},'test')
        res.status(200).json({result,token})
    } catch (error) {
        console.log(error)
    }
}