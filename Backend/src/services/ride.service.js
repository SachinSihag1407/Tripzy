import { Ride } from "../models/ride.model.js";
import { getDistanceTimeService } from "./maps.service.js";
import crypto from 'crypto'

async function getFareService(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await getDistanceTimeService(pickup, destination);

    const baseFare = {
        car: 50, motorcycle: 20,
        auto: 30
    };

    const perKmRate = {
        car: 15,
        motorcycle: 5,
        auto: 10
    };

    const perMinuteRate = {
        car: 2,
        motorcycle: 1,
        auto: 1.5
    };

    const fare = {
        car: Math.round(baseFare.car + ((distanceTime.distanceValue) / 1000 * perKmRate.car) + ((distanceTime.durationValue) / 60 * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + ((distanceTime.distanceValue) / 1000 * perKmRate.motorcycle) + ((distanceTime.durationValue) / 60 * perMinuteRate.motorcycle)),
        auto: Math.round(baseFare.auto + ((distanceTime.distanceValue) / 1000 * perKmRate.auto) + ((distanceTime.durationValue) / 60 * perMinuteRate.auto))
    };

    return fare;
}

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }

    return generateOtp(num);
}

export const createRideService = async ({ user, pickup, destination, vehicleType }) => {

    //1.check the parameters
    //2. calculate fare

    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required')
    }

    const fare = await getFareService(pickup, destination);

    const ride = Ride.create({
        user,
        pickup,
        destination,
        otp : getOtp(6),
        fare: fare[vehicleType]

    })


    return ride;

}

export default getFareService;

