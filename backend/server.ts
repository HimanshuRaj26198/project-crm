import { Server } from "http";
import app from "./app.ts";
import dotenv from "dotenv";
import { connectDb } from "./src/config/database.ts";

dotenv.config();

const PORT = process.env.PORT || 5000;
let server:Server;

const startServer = async () =>{
    try{
        await connectDb();    
        server = app.listen(PORT, (err)=>{
           if(!err){
             console.log("App Started on PORT: ", PORT)
           }
        })
    }catch(err){
        console.log("Failed to start the server", err);
    }
}



const shutdown = ()=>{
    if(server){
        server.close(()=>{
            console.log("HTTP Server Closed");
        })
    }else{
        console.log("Server not found");
    }
}

process.on("SIGTERM", shutdown);
process.on("SIGNIT", shutdown);

startServer();