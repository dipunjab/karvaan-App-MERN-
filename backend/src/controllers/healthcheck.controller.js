import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import mongoose from "mongoose"

const healthcheck = asyncHandler(async (req, res) => {
    const healthcheck = {
        //readyState is a property that tells the status of the MongoDB connection: 1 = Connected , 0 = Disconnected
        mongoDBConnection: mongoose.connection.readyState? "Connected✅":"Disconnected❌",
        
        //Uses process.uptime() to get how long the server has been running since it started.
        uptime: process.uptime(),

        //Uses Date.now() to get the current timestamp in milliseconds since January 1, 1970 (Unix Epoch)
        timestamps: Date.now(),

        //Uses process.hrtime() to get high-resolution time in nanoseconds.
        hrtime: process.hrtime()
    }
    if (!healthcheck) {
        throw new ApiError(400,"Failed to check health")
    }
    return res.json(new ApiResponse(200,healthcheck,"Health Checking status"))})

export {
    healthcheck
    }
    