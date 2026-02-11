import type { Request, Response, NextFunction } from "express";

interface RouteLimitOptions {
    windowsec: number;
    maxRequests: number;
}

type RequestData = {
    startTime: number;
    count: number;
}

const requestMap = new Map<string, RequestData>()

export const routeRateLimitter = (options: RouteLimitOptions)=>
(req:Request, res:Response, next:NextFunction)=>{
    try{
        const identifier = req.user?.id || req.ip;
        const startTime= Date.now();
        const requestData = requestMap.get(identifier);
        if(!requestData){
            requestMap.set(identifier, {startTime, count: 1});
            return next();
        }
        const timePassed = Date.now() - requestData.startTime;
        if( timePassed > options.windowsec * 1000){
            requestMap.set(identifier, {startTime, count: 1});
            return next();
        }

        if(requestData.count >= options.maxRequests){
            return res.status(429).json({
                success: false,
                message: "Too many requests!"
            })
        };

        requestData.count++
        requestMap.set(identifier, requestData);
        next();
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error! Something went wrong"
        })
    }
}