import { Router } from 'express'
import { confirmRide, createRide } from '../controllers/ride.controller.js';
import { authCaptain, authUser } from '../middlewares/auth.middleware.js';
import { body, query } from 'express-validator';
import { getFare } from '../controllers/ride.controller.js';

const rideRouter = Router();

rideRouter.post('/create',
    authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage("Invalid pickUp address"),
    body('destination').isString().isLength({ min: 3 }).withMessage("Invalid destination address"),
    body('vehicleType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage("Invalid vehicleType"),
    createRide

)

rideRouter.get('/get-fare',
    authUser,
    query('pickup').isString().isLength({min:3}).withMessage("Invalid pickup location"),
    query('destination').isString().isLength({min:3}).withMessage("Invalid destination location"),
    getFare

)

rideRouter.post('/confirm',
    authCaptain,
    body('rideId').isMongoId().withMessage("Invalid ride Id "),
    confirmRide
)

export default rideRouter;