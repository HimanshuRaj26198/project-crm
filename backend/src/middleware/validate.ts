import type { Request, Response, NextFunction } from "express";
import { success } from "zod";
import type { ZodSchema } from "zod";

export const validate = (Schema: ZodSchema)=>
(req:Request, res:Response, next:NextFunction)=>{
    try{
        Schema.parse(req.body);
        next();
    }catch(err:any){
        return res.status(400).json({
            success: false,
            errors: err.issues.map(a=>{
                return a.message
            })
        })
    }
}