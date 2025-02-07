import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"


//if userlogged in work with hat else work without that
export const verifyJWTOptional = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (token) {
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
            
            if (user) {
                req.user = user; 
            }
        }

        next(); 
    } catch (error) {
        req.user = null; 
        next(); 
    }
});
