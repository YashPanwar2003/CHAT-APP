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
io.on("connection", async (socket) => {

    const { userId } = socket.handshake.query
    onlineUsers.set(userId,socket.id)
    const userFind=await User.findById(userId).lean()
    io.emit("userConnect",userFind)
    socket.on("message", async (data) => {
        console.log(data)
        const { receiverId } = data
        const chatResult = await saveMessage(data);
        console.log(chatResult)
        if (!chatResult) return;
        const receiverSocketId=onlineUsers.get(receiverId)
        if (receiverSocketId){
            io.to(receiverSocketId).emit("message",data)
        }
    })
    socket.on("disconnect",(data)=>{
        console.log("user disconnected")
        const {userId}=socket.handshake.query
        onlineUsers.delete(userId)
        console.log(onlineUsers)
    })

})


export { app, httpServer, io };
