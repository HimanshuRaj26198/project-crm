import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload} from "jsonwebtoken";

export const authenticate = async (req:Request, res:Response, next:NextFunction)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            success: false,
            message: "No token found"
        });
    }
    try{
        let payload = jwt.verify(token, process.env.JWT_TOKEN_SECRET) as JwtPayload;
        req.user = payload;
        next();
    }catch(err){
        return res.status(401).json({
            success: false,
            message: "Authentication Failed!"
        })
    }
}