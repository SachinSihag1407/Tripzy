
import { User } from "../models/user.model.js"
import { createUser } from "../services/user.service.js"
import { cookie, validationResult } from "express-validator"
import { BlacklistToken } from "../models/blacklistToken.model.js"


const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    const isUserAlready = await User.findOne({ email });
    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist' });
    }


    const hashedPassword = await User.hashPassword(password);

    // make create the user

    const user = await createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword
    })

    // console.log("useeeerrrr",user);

    // now user bn gya to token generate
    const userToken = user.generateAuthToken();


    // now return the user and token 


    res.status(201).json({ userToken, user });


}

const loginUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() })
    }

    // now get the  info for login

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({ message: "Invalid user Details" })
    }

    const isMatch = await user.comparedPassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid user Details" })
    }
    const userToken = user.generateAuthToken();

    res.cookie("userToken", userToken);

    res.status(200).json({ userToken, user })


}

const getUserProfile = async (req, res, next) => {
    // now yha se phle to data bejo profile pe 
    res.status(200).json(req.user);
}

const logoutUser = async (req, res, next) => {
    res.clearCookie("token");

    // now token nikalo and balck list kr do  
    const userToken = req.cookies.userToken || req.headers.authorization.split(' ')[1];

    // ab isko black list krwa do 
    await BlacklistToken.create({ token: userToken });

    return res.status(200).json({ message: "Logged Out" })

}

export {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
}