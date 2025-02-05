import multer from "multer";
import path from "path"
import fs from "fs"
const folderName="uploads"
const folderPath=path.resolve(process.cwd(),folderName)
const multerStorage=multer.diskStorage({
    destination:async (req,file,cb)=>{
       if(!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath,{recursive:true})
       }
       cb(null,folderPath);
    },
    filename:(req,file,cb)=>{
        const prefix=req.user?._id;
        cb(null,file.fieldname+" "+prefix)
    }
})
const upload=multer({storage:multerStorage})
export default upload;