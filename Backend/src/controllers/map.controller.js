import { getAddressCoordinatesService, getAutoCompleteSuggestionService, getDistanceTimeService } from "../services/maps.service.js";
import { validationResult } from "express-validator";

const getCoordinates = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {

        const coordinates = await getAddressCoordinatesService(address)
        res.status(200).json(coordinates)

    } catch (error) {

        res.status(404).json({ message: 'Coordinates not found' });

    }

}

const getDistanceTime = async (req, res, next) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        // now get the origin and destination

        const { origin, destination } = req.query;

        const distanceTime = await getDistanceTimeService(origin, destination);

        res.status(200).json(distanceTime);


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" })

    }

}

const getSuggestion = async (req, res, next) => {

    try {
        //1.validation dekho and check 
        //2. take input
        //3. get the suugestion from the service function
        //4. return

        const errors = validationResult(req); // always return a array
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { input } = req.query;

        const suggestions = await getAutoCompleteSuggestionService(input);

        res.status(200).json(suggestions);

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal server error" })
    }

}


export {
    getCoordinates,
    getDistanceTime,
    getSuggestion
}