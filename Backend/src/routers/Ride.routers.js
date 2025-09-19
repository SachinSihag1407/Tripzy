import express from 'express'
import { Router } from 'express'

const rideRouter = Router();

rideRouter.post('/create',
    body('userId').isString().isLength({min : 24}).withMessage("Invalid user id"),
    body('pickup').isString().isLength({min : 3}).withMessage("Invalid pickUp address"),
    body('detination').isString().isLength({min : 3}).withMessage("Invalid destination address"),
   
)

export default rideRouter;