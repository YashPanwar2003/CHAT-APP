import bcrypt from "bcrypt";
const generateHash = async (password) => {
  try {
    const saltRounds = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
  } catch (error) {
    throw error;
  }
};
const compareHash=async(password,hashedPassword)=>{
   try{
      const result=await bcrypt.compare(password,hashedPassword)
      return result;
   }catch(err){
     throw err;
   }
}
export {generateHash,compareHash}