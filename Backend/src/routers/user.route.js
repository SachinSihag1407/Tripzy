import { Router } from "express";
import { body } from "express-validator"
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route('/register',
    [
        body('email').isEmail().withMessage("Invalid Email"),
        body('fullName.firstName').isLength({ min: 3 }).withMessage("First Name must be 3 letters"),
        body('password').isLength({ min: 6 }).withMessage("password must be 6 lenght")
    ], registerUser
)

export default router;