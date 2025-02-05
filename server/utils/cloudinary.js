import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})
const uploadToCloudinary=(filepath)=>{
    return new Promise((resolve,reject)=>{
        const uploadStream=cloudinary.uploader.upload_stream({folder:"uploads",resource_type:"auto"},(error,result)=>{
            if(error) reject(error)
            else resolve(result)
            fs.unlink(filepath,(err)=>{
                if(err) console.log("cant delete the file: "+err.message)
                
            })
        })
        fs.createReadStream(filepath).pipe(uploadStream)
       
    })
}
export default uploadToCloudinary;