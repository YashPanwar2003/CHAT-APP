import dotenv from "dotenv"
dotenv.config()
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})
const getPublicId=(imageURL)=>{
    const parts=imageURL.split("/");
    const backURL=parts.pop()
    const versionNumber=parts.findIndex((part)=>part.startsWith("v"))
    const publicId=parts[versionNumber+1]+"/"+backURL.split(".")[0]
    return publicId
}
export const deleteProfile=(imageURL)=>{
    return new Promise((resolve,reject)=>{
        const publicId=getPublicId(imageURL)
         cloudinary.uploader.destroy(publicId,(err,result)=>{
             if(err) reject(err)
             else resolve(result)
        })
    })
}

export const uploadToCloudinary=(filepath)=>{
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

