import { uploadToCloudinary, deleteProfile } from "../utils/cloudinary.js";
import statusCode from "../utils/statusCode.js"
import User from "../model/user.model.js"
import Chat from "../model/chat.model.js";
import mongoose from "mongoose";
import { profile } from "console";
const updateProfilePicture = async (req, res) => {
   try {
      if (!req.file) {
         return res.status(statusCode.invalid).json({ msg: "provide a profile picture" })
      }
      const filePath = req.file.path;

      const { _id, profilePic } = req.user;
      let pfResponse=profile
      if (profilePic !== "") {
         const deleteResponse = await deleteProfile(profilePic);
         
         if (deleteResponse?.result !== "ok") {

            return res.json({msg:"Unable to delete the file"})
         }
        
      }
      const uploadResponse = await uploadToCloudinary(filePath);
      pfResponse=uploadResponse.secure_url
      const updateUser = await User.findByIdAndUpdate(_id, { profilePic: pfResponse}, { new: true })
      return res.status(statusCode.success).json({ updateUser })
   } catch (err) {

      return res.status(statusCode.serverError).json({ msg: err.message });
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
const deleteUser = async (req, res) => {
   try {
      const userId = req.params.id
      const objectId = new mongoose.Types.ObjectId(userId)
      const deleteChats = await Chat.deleteMany({ participants: objectId })
      const deleteUser = await User.findByIdAndDelete(userId)
      const deleteProfilePic= await deleteProfile(deleteUser.profilePic)
      if (!!deleteUser && !!deleteChats && !!deleteProfilePic) {
         return res.status(statusCode.success).cookie("jwt", null).json({ result: true, msg: "Account is Deleted" })
      } else {
         throw new Error("Internal Error")
      }
   } catch (err) {
      console.log(err)
      return res.status(statusCode.serverError).json({ result: false, msg: err.message || "Something went wrong" })
   }
}
export { updateProfilePicture, checkAuth, getUsers, saveMessage, getMessages, deleteUser }