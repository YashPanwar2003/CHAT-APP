import multer from "multer"
import path, { basename, extname } from "path"
import fs from "fs"
const folderName="uploads"
const folderPath=path.resolve(process.cwd(),folderName)

const storage=multer.diskStorage({
    destination:async(req,file,cb)=>{
       if(!fs.existsSync(folderPath)){
          fs.mkdirSync(folderPath,{recursive:true})
       }
       cb(null,folderPath)
    },
    filename:async (req,file,cb)=>{
        if(!file.originalname){
            cb(new Error("file must have a name"))
            return;
        }
          const extName=path.extname(file.originalname).toString()
          const baseName=path.basename(file.originalname,extName).toString()
          const uniqueName=`${baseName}-${req.user?.username}${extName}`
          cb(null,uniqueName)
    } 
})
export const upload=multer({storage,limits:{
    fileSize:2*1024*1024,
}})