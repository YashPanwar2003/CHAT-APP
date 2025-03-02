import  {mongoose, Schema,model} from "mongoose"
const messageSchema=new Schema({
    senderId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    text:{
        type:String,
        default:"",
    },
    file:{
        type:String,
        default:"",
    },
    date:{
        type:Date,
        default:Date.now,
    }
})
const chatSchema=new Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }],
    messages:[messageSchema]
})

const Chat=model("Chat",chatSchema)
export default Chat