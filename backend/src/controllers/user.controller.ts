import type { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { success } from "zod";


export const signupUser = async (req: Request, res: Response)=>{
    let { firstName, lastName, email, password } = req.body;
    try{
        let exist = await UserModel.findOne({email});
        if(exist){
           return res.status(400).json({success: false, message: "User Already Exist!"})
        }
       const newUser =  await UserModel.create({firstName, lastName, email, password});
       return res.status(201).json({success: true});
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Error in creating user!"
        })
    }
}

export const signInUser = async (req: Request, res: Response) =>{
    const {email, password} = req.body;
    try{
        let validUser = await UserModel.findOne({email});
        if(!validUser){
            return res.status(404).json({success: false, message: "Invalid User!"});
        }
        let isPasswordValid  = await compare(password, validUser.password);
        if(!isPasswordValid ){
            return res.status(401).json({success: false, message: "Password does not match"});
        };

        const jwtSecret = process.env.JWT_TOKEN_SECRET;
        const refreshSecret = process.env.JWT_REFRESH_SECRET;
        if (!jwtSecret || !refreshSecret) {
            throw new Error("JWT secrets not configured");
        }
        const jwtToken = jwt.sign({ email: validUser.email, id: validUser._id }, jwtSecret, {expiresIn: "1d"});
        const refreshToken = jwt.sign({id: validUser._id}, refreshSecret, {expiresIn: "7d"})
        return res.status(200).cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict"
        }).json({
            success:true,
            jwtToken
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}


export const getMyProfile = async (req:Request, res:Response)=>{
    let userId = req.user.id || null;
    if(!userId){
        return res.status(404).json({
            message: "User not found!"
        })
    }
    let result = await UserModel.findById(userId).select("-password");
    
    return res.status(200).json(result)
}


export const refreshToken = async (req:Request, res:Response) =>{
    const refreshToken = req?.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({message: "No refresh token"});
    }

    try{
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = jwt.sign(
            {id: payload.id, email: payload.email},
            process.env.JWT_SECRET_TOKEN,
            { expiresIn: "15m" }
        );

        return res.status(200).json({
            token: newAccessToken
        })
    }catch(err){
        return res.status(401).json({
            message: "Invalid Refresh TOken"
        })
    }
}