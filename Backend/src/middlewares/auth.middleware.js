import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"
import { BlacklistToken } from "../models/blacklistToken.model.js";

export const authUser = async (req, res, next) => {
    // sbse phle token ko lo 
    //1. here are 2 ways 1 is from cookie and other is from header
    const token = await req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const isBlackListed = await BlacklistToken.findOne({token : token});

    if(isBlackListed){
        return res.status(401).json({message:"Unauthorized"})
    }

    // agr token valid h to user le lo qki token me id aati h 
    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded._id)

        // now set the user in req 
        req.user = user;

        // terminatte 
        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }

}