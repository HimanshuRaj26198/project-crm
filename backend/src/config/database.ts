import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDb = (async ()=>{
    try{
        let connection = await connect(process.env.DATABASE_URI);
        console.log("Connected To Database");
    }catch(err){
        console.log("Error in database connection", err)
    }
});