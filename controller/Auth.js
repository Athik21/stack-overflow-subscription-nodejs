import bcrypt from 'bcryptjs'
import jwt  from 'jsonwebtoken'
import users from '../models/auth.js'

export const signup = async (req,res) =>{
    const { name, email, password } = await req.body;
    try{
        const existinguser = await users.findOne({email});
        if(existinguser){
            console.log(existinguser)
            return res.status(404).json("user already exist");
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await users.create({name,email,password: hashedPassword})
        const token = jwt.sign({email: newUser.email, id: newUser.id}, process.env.JWT_SECRET ,{expiresIn: "1h"});
        res.status(200).json({result: newUser, token})
        console.log(token);
    }
    catch(error){
        console.log(error)
        res.status(500).json("something went wrong")
    }
} 

export const login = async (req,res) =>{
    const {email, password} = req.body;
    console.log(req.body)
    try{
        const existinguser = await users.findOne({email});
        console.log(existinguser)
        if(!existinguser){
            console.log("user not exiflsa")
            return res.status(404).json({message: "User don't exist"})
            
        }
        const isPasswordExist = await bcrypt.compare(password,existinguser.password)
        if(!isPasswordExist){
            return res.status(400).json({message:"invalid credentials"});
        }
        const token = jwt.sign({email: existinguser.email, id:existinguser.id}, "test",{expiresIn: "1h"});
        res.status(200).json({result: existinguser,token});
    }catch(error){
        console.log(error)
        res.status(500).json("something went wrong")
    }
} 