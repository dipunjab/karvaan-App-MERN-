import { Subscription } from "../models/subscription.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import mongoose, { isValidObjectId } from "mongoose"


//check if user has subscribed 
const statusOfChannelSubByUser = asyncHandler(async (req, res) => {
    const { channelId } = req.params;

    const checkSub = await Subscription.findOne({
        subscriber: req.user._id,
        channel: channelId    });

    if (checkSub) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { isSubscribed: true },
                    "User has subscribed to this channel"
                )
            )
    } else {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { isSubscribed: false },
                    "User has not subscribed to this channel"
                )
            )
    }
});

const toggleSubscription = asyncHandler(async (req, res) => {
    // lets understand what just happened
    // first we will get the channel id it is a userid to whom we are subscribing
    // then the current logged in user will be the subscriber
    // first we will check if we are not subscribing to ourselve
    // then will find the subscriotion doc if it exist 
    // if exist means we have already subscribrd and hitting this end potin will unsubscribe and vice versa

    const { channelId } = req.params // this is actually a user
    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalide channel ID")
    }

    const userId = req.user._id;

    if (userId.toString() === channelId.toString()) {
        throw new ApiError(400, "You cannot subscribe to your own channel.");
    }

    let existSubscription = await Subscription.findOne({
        subscriber: userId,
        channel: channelId
    });

    if (existSubscription) {
        const deleteExistSubscription = await Subscription.findByIdAndDelete(existSubscription._id)
        return res
            .status(200)
            .json(new ApiResponse(200, deleteExistSubscription, "Successfully unsubscribed from the channel."));
    } else {
        const createSubscription = await Subscription.create({
            subscriber: userId,
            channel: channelId
        });
        return res
            .status(200)
            .json(new ApiResponse(200, createSubscription, "Successfully subscribed the channel."));
    }

});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalide channel ID")
    }

    const getChannelSubscriber = await Subscription.aggregate([
        {
            $match: {
                channel: new mongoose.Types.ObjectId(channelId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "subscriber",
                foreignField: "_id",
                as: "subscribers"
            }
        },
        //the $unwind operation in MongoDB is used to break down an array inside a document into multiple individual documents, one for each element of that array.
        {
            $unwind: "$subscribers", // Flatten the array
        },
        {
            $project: {
                _id: 0,
                subscriberId: "$subscribers._id",
                fullname: "$subscribers.fullname",
                username: "$subscribers.username",
                avatar: "$subscribers.avatar",
                subscribedAt: "$createdAt",
            },
        }
    ]);
    if (!getChannelSubscriber) {
        throw new ApiError(400, "Failed to get Subscribers")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, getChannelSubscriber, "User channel subscriber feteched successfullyy"))
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    if (!isValidObjectId(subscriberId)) throw new ApiError(400, "Invalide Subscriber ID")

    const subscribedChannels = await Subscription.aggregate([
        {
            $match: {
                subscriber: new mongoose.Types.ObjectId(subscriberId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "channel",
                foreignField: "_id",
                as: "subscribedChannels"
            }
        },
        //the $unwind operation in MongoDB is used to break down an array inside a document into multiple individual documents, one for each element of that array.
        {
            $unwind: "$subscribedChannels"
        },
        {
            $project:{
                fullname: "$subscribedChannels.fullname",
                username: "$subscribedChannels.username",
                avatar: "$subscribedChannels.avatar",
            }
        }
    ])
    if (!subscribedChannels || subscribedChannels.length === 0) {
        throw new ApiError(404, "No subscribed channels found for the given subscriber id");
    }

    return res.json(new ApiResponse(200,subscribedChannels,"channel list fetched successfully"))

});

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels,
    statusOfChannelSubByUser
}