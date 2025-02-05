import dotenv from "dotenv"
dotenv.config()
import connectDb from "./DB/connnectToDb.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import {app,httpServer,io} from "./sockets/socket.js"
import {authRouter} from "./routes/authRoutes.js"
import protectRoute from "./middleware/authMiddleware.js"
import { userRouter } from "./routes/userRoutes.js"
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",protectRoute,userRouter)
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

