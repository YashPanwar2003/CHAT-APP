import express from "express"
import {createServer} from "http"
import { Server } from "socket.io"

const app=express()
const httpServer=createServer(app)
const io = new Server(httpServer,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true,
        methods:["GET","POST"],
        
    }
})


export {app,httpServer,io};
