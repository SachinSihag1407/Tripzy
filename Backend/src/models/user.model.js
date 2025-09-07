import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'firstName must be 3 Charater']
        },
        lastName: {
            type: String,
            minlength: [3, 'firstName must be 3 Charater']
        }
    },
    email: {
        type: String,
        required: true,
        minlength: [3, 'firstName must be 3 Charater']
    },
    password: {
        type: String,
        required: true,
        select: false   // mkuch bhi selct ho ho yya data le to ye na aaye sath me
    },
    socketId: {
        type: String
    }
}, { timestamps: true })

// now iske schema se hn kuch methods ko access krenge 

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" })
    return token;
}

userSchema.methods.comparedPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}



export const User = mongoose.model("User", userSchema)