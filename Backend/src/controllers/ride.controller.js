import { validationResult } from "express-validator"
import getFareService, { createRideService } from "../services/ride.service.js";
import { get } from "mongoose";

const createRide = async (req, res) => {
    const errors = validationResult(req);

    // console.log("REQ BODY:", req.body);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { pickup, destination, vehicleType } = req.body;

    try {

        const ride = await createRideService({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        })   // yha bosy se lena h mtlb user jo fill krega vha se aayega data

        return res.status(201).json(ride);

    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

const getFare = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const fare = await getFareService(pickup,destination);
        return res.status(200).json(fare)
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }

    con

}


export {
    createRide,
    getFare
}