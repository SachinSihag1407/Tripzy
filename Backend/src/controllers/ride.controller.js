import { validationResult } from "express-validator"
import getFareService, { confirmRideService, createRideService, endRideService, startRideService } from "../services/ride.service.js"
import { getCaptainInRadiusService, getAddressCoordinatesService } from "../services/maps.service.js";
import { get } from "mongoose";
import { Captain } from "../models/captain.model.js";
import { sendMessageToSocketId } from "../../socket.js";
import { Ride } from "../models/ride.model.js";

// inside createRide controller (before createRideService call)



// const createRide = async (req, res) => {

//     if (!req.user) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() })
//     }

//     const { pickup, destination, vehicleType } = req.body;

//     try {
//         const ride = await createRideService({ user: req.user._id, pickup, destination, vehicleType });
//         res.status(201).json(ride);

//         const pickupCoordinates = await getAddressCoordinatesService(pickup);
//         console.log(pickupCoordinates);



//         const captainsInRadius = await getCaptainInRadiusService(pickupCoordinates.lat, pickupCoordinates.lng, 50);
//         console.log(captainsInRadius);

//         ride.otp = ""

//         const rideWithUser = await Ride.findOne({ _id: ride._id }).populate('user');

//         const allCaptains = await Captain.find();
//         console.log("All Captains:", allCaptains);
//         captainsInRadius.map(captain => {

//             console.log(captain, ride);
//             sendMessageToSocketId(captain.socketId, {
//                 event: 'new-ride',
//                 data: rideWithUser
//             })

//         })

//     } catch (err) {

//         console.log(err);
//         return res.status(500).json({ message: err.message });
//     }

// };

const createRide = async (req, res) => {
    console.log("req.user at start of createRide:", req.user);


    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await createRideService({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

        const pickupCoordinates = await getAddressCoordinatesService(pickup);
        console.log(pickupCoordinates);

        const captainsInRadius = await getCaptainInRadiusService(pickupCoordinates.lat, pickupCoordinates.lng, 500);
        console.log(captainsInRadius);

        ride.otp = "";

        const rideWithUser = await Ride.findOne({ _id: ride._id }).populate('user');
        const activeCaptains = captainsInRadius.filter(c => c.status === 'active');
        // ✅ Single loop for socket only
        captainsInRadius.forEach((captain) => {
            if (captain.socketId) {
                sendMessageToSocketId(captain.socketId, {
                    event: 'new-ride',
                    data: rideWithUser
                });
            }
        });

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


const startRide = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await startRideService({ rideId, otp, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-start',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

const endRide = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { rideId } = req.body;

    try {
        const ride = await endRideService({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })
        

        return res.status(200).json(ride);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export {
    createRide,
    getFare,
    confirmRide,
    startRide,
    endRide

}