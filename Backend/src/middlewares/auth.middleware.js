import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"
import { BlacklistToken } from "../models/blacklistToken.model.js";
import { Captain } from "../models/captain.model.js";

export const authUser = async (req, res, next) => {
    // sbse phle token ko lo 
    //1. here are 2 ways 1 is from cookie and other is from header
    const userToken  = await req.cookies.userToken  || req.headers.authorization?.split(' ')[1];

    if (!userToken ) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const isBlackListed = await BlacklistToken.findOne({ token: userToken  });

    if (isBlackListed) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    // agr token valid h to user le lo qki token me id aati h 
    try {
        const decoded = Jwt.verify(userToken , process.env.JWT_SECRET);
        console.log("Decoded:", decoded);
        const user = await User.findById(decoded._id)

        // // now set the user in req 
        // req.user = user;

        // // terminatte 
        // return next();

        // after: const user = await User.findById(decoded._id)

        req.user = user;
        return next();


    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }

}

export const authCaptain = async (req, res, next) => {
    // sbse phle token ko lo 
    //1. here are 2 ways 1 is from cookie and other is from header
    const captainToken  = await req.cookies.captainToken  || req.headers.authorization?.split(' ')[1];

    if (!captainToken ) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const isBlackListed = await BlacklistToken.findOne({ token: captainToken  });

    if (isBlackListed) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    // agr token valid h to user le lo qki token me id aati h 
    try {
        const decoded = Jwt.verify(captainToken , process.env.JWT_SECRET);
        console.log("Decoded Captain:", decoded);

        const captain = await Captain.findById(decoded._id);
        req.captain = captain;

        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" })
    }


}