import mongoose, { Schema } from "mongoose";

const rideSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',

    },

    pickup: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true
    },



    fare: {
        type: Number,
        required: true
    },


    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },

    duration: {
        type: Number,

    },

    distance: {
        type: Number,
    },

    rating: {
        type: Number
    },

    paymentID: {
        type: String
    },

    oderId: {
        type: String
    },

    otp: {
        type: String,
        required : true
    }



})

export const Ride = mongoose.model('Ride', rideSchema);