import mongoose from "mongoose"
const connectDb=async function(){
    try{
        await mongoose.connect(process.env.DB_URI);
    }catch(err){
        throw err;
    }
    

}
//this function should be executed before the server is put to listen
export default connectDb;