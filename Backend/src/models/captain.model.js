import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const captainSchema = new Schema({
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
        minlength: [3, 'firstName must be 3 Charater'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        select: false   // mkuch bhi selct ho ho yya data le to ye na aaye sath me
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be at least 3 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        }
    },

    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }

}, { timestamps: true })

// now iske schema se hn kuch methods ko access krenge 

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" })
    return token;
}

captainSchema.methods.comparedPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}



export const Captain = mongoose.model("Captain", captainSchema)