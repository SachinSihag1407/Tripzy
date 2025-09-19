import rideModel from "../models/ride.model.js";
import { getDistanceTimeService } from "./maps.service.js";

async function getFare(pickUp, destination) {

    if (!pickUp || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await getDistanceTimeService(pickUp, destination);

    const baseFare = {
        car: 50,
        bike: 20,
        auto: 30
    };

    const perKmRate = {
        car: 15,
        bike: 5,
        auto: 10
    };

    const perMinuteRate = {
        car: 2,
        bike: 1,
        auto: 1.5
    };

    const fare = {
        car: baseFare.car + (distanceTime.distance * perKmRate.car) + (distanceTime.time * perMinuteRate.car),
        bike: baseFare.bike + (distanceTime.distance * perKmRate.bike) + (distanceTime.time * perMinuteRate.bike),
        auto: baseFare.auto + (distanceTime.distance * perKmRate.auto) + (distanceTime.time * perMinuteRate.auto)
    };

    return fare;
}

export const createRide = async ({ user, pickUp, destination, vehicleType }) => {

    //1.check the parameters
    //2. calculate fare

    if (!user || !pickUp || !destination || !vehicleType){
        throw new Error('All fields are required')
    }

    const fare = await getFare(pickUp,destination);

    const ride = Ride

    }

}


