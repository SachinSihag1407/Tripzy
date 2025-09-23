import { validationResult } from "express-validator"
import getFareService, { confirmRideService, createRideService } from "../services/ride.service.js"
import { getCaptainInRadiusService, getAddressCoordinatesService } from "../services/maps.service.js";
import { get } from "mongoose";
import { Captain } from "../models/captain.model.js";
import { sendMessageToSocketId } from "../../socket.js";
import { Ride } from "../models/ride.model.js";

const createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await createRideService({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

        const pickupCoordinates = await getAddressCoordinatesService(pickup);



        const captainsInRadius = await getCaptainInRadiusService(pickupCoordinates.lat, pickupCoordinates.lng, 2);

        ride.otp = ""

        const rideWithUser = await Ride.findOne({ _id: ride._id }).populate('user');

        captainsInRadius.map(captain => {
            console.log(captain, ride);

            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })

        })

    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }

};


const getFare = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await getFareService(pickup, destination);
        return res.status(200).json(fare)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    

}

const confirmRide = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await confirmRideService({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }


}


export {
    createRide,
    getFare,
    confirmRide
}