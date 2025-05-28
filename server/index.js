import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectDb from "./DB/connnectToDb.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import {app,httpServer,io} from "./sockets/socket.js"
import {authRouter} from "./routes/authRoutes.js"
import protectRoute from "./middleware/authMiddleware.js"
import { userRouter } from "./routes/userRoutes.js"
import path from "path"
import cors from "cors"

const __dirname=path.resolve()
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",protectRoute,userRouter)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../client/dist")))
}
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../client","dist","index.html"))
})

async function main(){
    try {

        await connectDb();
        httpServer.listen(process.env.PORT,(err)=>{
            if(err) throw err;
            console.log("Server started on port : "+process.env.PORT)
        })
        
    } catch (error) {
        console.log(error)
    }
}
main();

