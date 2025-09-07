import { Router } from "express";
import { body } from "express-validator"
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post('/register',
    [
        body('email').isEmail().withMessage("Invalid Email"),
        body('fullName.firstName').isLength({ min: 3 }).withMessage("First Name must be 3 letters"),
        body('password').isLength({ min: 6 }).withMessage("password must be 6 lenght")
    ], registerUser
)

userRouter.post('/login', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 6 }).withMessage("password must be 6 lenght")
    , loginUser])

userRouter.get('/profile', authUser, getUserProfile)
userRouter.get('/logout', authUser, logoutUser)

export default userRouter;