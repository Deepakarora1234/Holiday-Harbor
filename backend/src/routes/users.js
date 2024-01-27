import express from "express"
import "dotenv/config"
import User from "../models/user.js"
import jwt from "jsonwebtoken"
import { check, validationResult } from "express-validator"


const router = express.Router();

router.post("/register",[
  check("firstName","First Name is required").isString(),
  check("lastName","Last Lame is required").isString(),
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more charaters required").isLength({min:6})
], async (req, res)=>{
  const errors =validationResult(req);
  if(!errors.isEmpty())
  {
    return res.status(400).json({message : errors.array()})
  }
    try {
        await User.findOne({
        email:req.body.email
      }).then(async function(user){

      if(user) {
        console.log("here");
        return res.status(400).json({message : "User already exists"})
      }
      
      user = new User(req.body)
      await user.save();

      const token =  jwt.sign({userId:user.id},"GXoIQwI81xDQSoYonjGHBXeBjcmK1pZo", {
        expiresIn : "1d"
      }
      );
      res.cookie("auth_token", token, {
        httpOnly:true, 
        secure : process.env.Node_ENV === "production",
        maxAge:86400000,
      })
      return res.status(200).json({message : "registration successfull!"})
      
    }
      
  
      )
  }
    catch(error)
    {
        console.log(error);
        res.status(500).send({message : "Something went wrong"})
    }

});
export default router
