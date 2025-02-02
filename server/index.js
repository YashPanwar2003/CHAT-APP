import dotenv from "dotenv"
dotenv.config()
import connectDb from "./DB/connnectToDb.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import {app,httpServer,io} from "./sockets/socket.js"
app.use(bodyParser.json())
app.use(cookieParser())

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

