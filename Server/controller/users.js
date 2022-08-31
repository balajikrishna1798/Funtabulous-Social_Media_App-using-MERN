//importing libraries

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { postMessage } from "../models/PostsMessage.js";
import { Users } from "../models/Users.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { Otp } from "../models/Otp.js";

export const signin = async (req, res) => {
  //getting request from front-end
  const { email, password } = req.body;
  //checking whether the user is exists or not
  const existingUser = await Users.findOne({ email });
  //decline if there is no existing User
  if (!existingUser) {
    return res.status(400).json({ message: "EmailId is not found" });
  } else {
    //checking whether the password is correct or not
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    //if the password is incorrect decline request
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    //assign token and results to front-end by using Secret-Key
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test"
    );
    res.status(200).json({ result: existingUser, token });
  }
};

export const verifyUser = async (req, res, next) => {
  const user = await Users.findOne({ email: req.body.email });
  if (user && user.isVerified) {
    next();
  } else {
    return res.status(400).json({ message: "EmailId is not found" });
  }
};

export const signup = async (req, res) => {
  //getting request from front-end
  const { firstName, email, password, confirmPassword } = req.body;
  try {
    //checking whether the user is exists or not
    const existingUser = await Users.findOne({ email });
    //if email already exists decline
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    //checking that given password and confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }
    //bcrypting  given password
    const hashedPassword = await bcrypt.hash(password, 12);
    //saving to database if all the validation passed
    const User = new Users({
      email,
      password: hashedPassword,
      name: firstName,
      isVerified: false,
      emailToken: crypto.randomBytes(64).toString("hex"),
    });
    await User.save();
    //sending Email to the user to verify
    const mailOptions = {
      from: "balajikrishna44589@gmail.com",
      to: User.email,
      subject: "Verify your email address",
      html: `<p>Hello ${User.name}! Welcome to funtabulous.Please Verify your email address to complete the signup process and login to your account</p>
            <p>press here <a href="http://${req.headers.host}/users/verify-email?token=${User.emailToken}"> here</a> to verify your mailId. </p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Verification Mail sent");
        res.status(400).json({ message: "Verification Mail sent" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const emailVerified = async (req, res) => {

  try {
    //getting token from mail verification
    const token = req.query.token;
    //Checking if there any emailToken with token
    const user = await Users.findOne({ emailToken: token });
    if (user) {
    //assign value to database as verified
      user.emailToken = null;
      user.isVerified = true;
      await user.save();
      //redirect to login page after verify email
      res.redirect("http://localhost:3000/auth");
    } else {
      console.log("Email is not verified");
    }
  } catch (error) {
    console.log(error);
  }
};

export const verifyPasswordMail = async (req, res) => {
    //Checking emailid from front-end
  const User = await Users.findOne({ email: req.body.email });

  if (User) {
    //generate OTP 
    let otpCode = Math.floor(Math.random() * 10000 + 1);
    //save OTP to database with expire time
    let otpData = new Otp({
      email: req.body.email,
      code: otpCode,
      expiresIn: new Date().getTime() + 300 * 1000,
    });
    await otpData.save();
    //send OTP to mail
    const mailOptions = {
      from: "balajikrishna44589@gmail.com",
      to: User.email,
      subject: "verify your email",
      html: `<p>Hello ${User.name}. Your OTP is ${otpData.code}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
        console.log("Verification Mail sent");
      }
    });
  } else {
    return res.status(400).json("error");
  }
};

export const changePassword = async (req, res) => {
    //Checking whether is there any OTP with that mail address
  let data = await Otp.findOne({ email: req.body.email, code: req.body.code });

  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expiresIn - currentTime;
    //if time expires OTP will not be valid
    if (diff < 0) {
      return res.status(400).json("error");
    } else {
    //if valid new password will be save.
      const User = await Users.findOne({ email: req.body.email });
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      User.password = hashedPassword;
      User.save();
      console.log("Success");
      res.status(200).json("Password Changed");
    }
  } else {
    return res.json(400).json("Error");
  }
};

export const updateProfile = async (req, res) => {
  try {
    //checking any user with that id
    const existingUser = await Users.findById(req.userId);
    //if user exists update details in database
    if (existingUser) {
      existingUser.name = req.body.name || existingUser.name;
      existingUser.email = req.body.email || existingUser.email;
      existingUser.pic = req.body.pic || existingUser.pic;

      await existingUser.save();
      console.log(existingUser);
      return res.status(200).json({ result: existingUser });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const existingUser = await Users.findById(req.userId);
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test"
    );
    if (existingUser) {
      return res.status(200).json({ result: existingUser, token });
    }
  } catch (error) {}
};

export const GoogleSignIn = async (req, res) => {
  const { email, name, token, googleId } = req.body;
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser &&existingUser.isVerified) {
      res.status(400).json({ message: "Email Address already exists" });
    } else if (existingUser) {
      res.status(200).json({ result: existingUser, token });
    }
    if (!existingUser) {
      const result = await Users.create({
        email,
        name,
        googleId,
        isVerified:true
      });
      res.status(200).json({ result, token });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getOthersPosts = async (req, res) => {
  Users.findOne({ _id: req.params.id })
    .then((user) => {
      postMessage
        .find({ creator: req.params.id })
        .exec((err, posts) => {
          if (posts) {
            res.json({ user, posts });
          }
        });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
};

export const getOthersGooglePosts = async (req, res) => {
  Users.findOne({ googleId: req.params.id })
    .then((user) => {
      postMessage
        .find({ creator: req.params.id })
        .exec((err, posts) => {
          if (posts) {
            res.json({ user, posts });
          }
        });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
};
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "balajikrishna44589@gmail.com",
    pass: "gjvkdihwboxlykyz",
  },
});

export const searchUsers = async(req,res) =>{
    const name = req.body.name
    Users.find({name:{$regex:name,$options:'$i'}})
    .then(user=>{
       res.json({user})
    }).catch(err=>{
        console.log(err);
        res.send(err)
    })

    }
