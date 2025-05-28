import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { saveMessage } from "../controllers/userControllers.js"
import User from "../model/user.model.js"
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST"],

    }
})
const onlineUsers = new Map()
io.on("connection", async (socket) =>{
    const { userId } = socket.handshake.query
    onlineUsers.set(userId,socket.id)
    io.emit("userConnect",Array.from(onlineUsers.entries()))
    socket.on("message", async (data,callback) => {
        
        const { receiverId } = data
        try{
           const findReceiver= await User.findById(receiverId)
           if(!findReceiver) return callback({status:"error",msg:"User doesn't exist anymore"})

        }catch(err){
            console.log(err)
        }
       const chatResult=await saveMessage(data)
        if(chatResult) callback({status:"ok",msg:"Message sent"})
        const receiverSocketId=onlineUsers.get(receiverId)
        if (receiverSocketId){
            io.to(receiverSocketId).emit("message",data)
        }
    }) 
    socket.on("disconnect",()=>{
        
        const {userId}=socket.handshake.query
        const deletedUser=onlineUsers.delete(userId)
        if(deletedUser) {
            io.emit("userDisconnect",Array.from(onlineUsers.entries()))
        }
       
    })

})


export { app, httpServer, io };
