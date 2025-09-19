import express from "express"
import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { getCoordinates, getDistanceTime, getSuggestion } from "../controllers/map.controller.js";
import { query } from "express-validator";

const mapRouter = Router();

mapRouter.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    
    getCoordinates)

mapRouter.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authUser,
    getDistanceTime
)

mapRouter.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authUser,
    getSuggestion
)

export default mapRouter;