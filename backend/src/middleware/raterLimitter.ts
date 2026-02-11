import type { Request, Response, NextFunction } from "express";

const REQUEST_LIMIT=100;
const TIME_WINDOW=60*1000;

type IpData = {
    count:number;
    startTime:number;
}

const ipMap = new Map<string, IpData>();

export const rateLimitter = (req:Request, res:Response, next:NextFunction)=>{

    const ip = req.ip;
    const now = Date.now();

    const ipData = ipMap.get(ip);

    if(!ipData){
        ipMap.set(ip, {count: 1, startTime: now});
        return next();
    };

    const timePassed = now - ipData.startTime;
    if(timePassed > TIME_WINDOW){
        ipMap.set(ip, { count:1, startTime: now });
        return next();
    };

    if(ipData.count >= REQUEST_LIMIT){
        return res.status(429).json({
            success: false,
            message: "Too many requests. Please try again later!"
        })
    };

    ipData.count++;
    ipMap.set(ip, ipData);
    return next();
}