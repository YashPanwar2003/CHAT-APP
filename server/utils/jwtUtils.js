import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  try {
    
    const token = jwt.sign({ userId }, process.env.SECRET);
    return token;
  } catch (error) {
    throw error;
  }
};
export const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    return payload;
  } catch (err) {
    throw err;
  }
};
