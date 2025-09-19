import mongoose, { Schema } from "mongoose";

const rideSchema = new Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    captain: {
        type: mongoose.Schema.ObjectId,
        ref: 'Captain',

    },

    pickUp: {
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
        type: Number,
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

    signature: {
        type: String
    }



})

export default Ride = mongoose.model('Ride', rideSchema);