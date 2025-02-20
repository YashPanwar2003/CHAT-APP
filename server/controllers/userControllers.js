import uploadToCloudinary from "../utils/cloudinary.js";
import statusCode from "../utils/statusCode.js"
import User from "../model/user.model.js"
const updateProfilePicture=async(req,res)=>{
   try{
    if(!req.file){
        return  res.status(statusCode.invalid).json({msg:"provide a profile picture"})

    }
    const filePath=req.file.path;
    const {_id}=req.user;
    const uploadResponse=await uploadToCloudinary(filePath);
    const updateUser=await User.findByIdAndUpdate(_id,{profilePic:uploadResponse.secure_url},{new:true})
   }catch(err){
      return res.status(statusCode.serverError).json({msg:"something went wrong"});
   }
}
const checkAuth=async(req,res)=>{
   try{
      if(req.user){
         return res.status(statusCode.success).json(req.user)
      }
      throw new Error("No authorized User")
   }catch(err){
      return res.status(statusCode.serverError).json({msg:err.message || "something went wrong"})
   }
}
const getUsers=async(req,res)=>{
   try{
     const {_id : loggedUser}=req.user;
     const filteredUsers=await User.find({_id:{$ne:loggedUser}})
     return res.status(statusCode.success).json(filteredUsers)
   }catch(err){
     return res.status(statusCode.serverError).json({msg:"something went wrong"})
   }
}
export {updateProfilePicture,checkAuth,getUsers}