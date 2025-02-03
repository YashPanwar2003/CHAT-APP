import statusCode from "../utils/statusCode.js";
import { verifyToken } from "../utils/jwtUtils.js";
import User from "../model/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    
    const token = req.cookies.jwt
    if (!token) {
      return res
        .status(statusCode.unauthorized)
        .json({ msg: "user unauthorized" });
    }
    const decoded = verifyToken(token);
    if(!decoded) return res.status(statusCode.invalid).json({msg:"Unauthorized - An invalid token"})
    const user = await User.findById(decoded.userId).lean();
    if (!user)
      return res.status(statusCode.invalid).json({ msg: "User not found" });

    req.user = user;
    console.log(req.user)
    next();
  } catch (err) {
    console.log("error  name : " + err.message);
    return res
      .status(statusCode.unauthorized)
      .json({ msg: "user unauthorized" });
  }
};
export default protectRoute;
