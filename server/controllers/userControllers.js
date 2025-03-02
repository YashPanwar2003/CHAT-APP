import {uploadToCloudinary,deleteProfile}from "../utils/cloudinary.js";
import statusCode from "../utils/statusCode.js"
import User from "../model/user.model.js"
import Chat from "../model/chat.model.js";
const updateProfilePicture = async (req, res) => {
   try {
      if (!req.file) {
         return res.status(statusCode.invalid).json({ msg: "provide a profile picture" })
      }
      const filePath = req.file.path;
      console.log(filePath)
      const { _id,profilePic } = req.user;
      if(profilePic!==""){
         const deleteResponse=await deleteProfile(profilePic);
         if(deleteResponse?.result==="ok"){
            console.log("image deleted")
            await User.findByIdAndUpdate(_id,{profilePic:""})
         }
      }
      const uploadResponse = await uploadToCloudinary(filePath);
      const updateUser = await User.findByIdAndUpdate(_id, { profilePic: uploadResponse.secure_url }, { new: true })
      return res.status(statusCode.success).json({ updateUser })
   } catch (err) {
      console.log(err)
      return res.status(statusCode.serverError).json({ msg:err.message });
   }
}
const checkAuth = async (req, res) => {
   try {
      if (req.user) {
         return res.status(statusCode.success).json(req.user)
      }
      throw new Error("No authorized User")
   } catch (err) {
      return res.status(statusCode.serverError).json({ msg: err.message || "something went wrong" })
   }
}
const getUsers = async (req, res) => {
   try {
      const { _id: loggedUser } = req.user;
      const filteredUsers = await User.find({ _id: { $ne: loggedUser } })
      return res.status(statusCode.success).json(filteredUsers)
   } catch (err) {
      return res.status(statusCode.serverError).json({ msg: "something went wrong" })
   }
}
const saveMessage = async (data) => {
   try {
      const { receiverId, senderId, text } = data;
      const chat = await Chat.findOne({ participants: { $all: [senderId, receiverId] } })
      if (!chat) {
         const newChat = await Chat.create({ participants: [senderId, receiverId], messages: [{ senderId, receiverId, text }] })
         return newChat
      }
      chat.messages.push({ senderId, receiverId, text })
      await chat.save()
      return chat
   } catch (err) {
      console.log(err)
      return undefined
   }
}
const getMessages = async (req, res) => {
   try {
      const { senderId, receiverId } = req.body
      const chat = await Chat.findOne({ participants: { $all: [senderId, receiverId] } })
      if (!chat) {
         return res.status(statusCode.success).json({ msg: [] })
      }
      return res.status(statusCode.success).json({ msg: chat.messages })
   } catch (err) {
      return res.status(statusCode.serverError).json({ msg: "Something went wrong" })
   }
}
export { updateProfilePicture, checkAuth, getUsers, saveMessage, getMessages }