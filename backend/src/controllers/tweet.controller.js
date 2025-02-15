import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    const {content} = req.body;
    if (!content) {
        throw new ApiError(404, "Content is required")
    }

    const tweet = await Tweet.create({
        content: content,
        owner: req.user._id
    });
    if(!tweet){
        throw new ApiError(400, "Failed to create tweet")
    }

    return res  
            .status(200)
            .json(new ApiResponse(200, tweet, "Tweet created successfuly"))
});

const getUserTweets = asyncHandler(async (req, res) => {
    const {userId} = req.params
    const user = await User.findById(userId)
    if(!user){
        throw new ApiError(400, "User does not exist")
    }

    const getTweets = await Tweet.find({
        owner: userId
    });
    if (!getTweets) {
        throw new ApiError(400, "Failed to get user tweets")
    }

    return res.status(200).json(new ApiResponse(200, getTweets, "User tweets fetched successfully"))
});

const updateTweet = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    const findTweet = await Tweet.findById(tweetId)
    if(!findTweet){
        throw new ApiError(400, "Tweet does not exist with this ID")
    }

    if(req.user._id.toString() !== findTweet.owner.toString()){
        throw new ApiError(400, "You dont have permission to update this Tweet")
    }

    const {content} = req.body
    if(!content){
        throw new ApiError(400, "Content is required to update")
    }

    const tweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set: {
                content: content
            }
        },
        {
            new: true
        }
    );
    if(!tweet){
        throw new ApiError(400, "Failed to update tweet")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, tweet, "Tweet updated successfully"))
});

const deleteTweet = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    const findTweet = await Tweet.findById(tweetId)
    if(!findTweet){
        throw new ApiError(400, "Tweet does not exist with this ID")
    }

    if(req.user._id.toString() !== findTweet.owner.toString()){
        throw new ApiError(400, "You dont have permission to update this Tweet")
    }

    const tweet = await Tweet.findByIdAndDelete(tweetId);
    if(!tweet){
        throw new ApiError(400, "Failed to update tweet")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, tweet, "Tweet deleted successfully"))
});

const getAllTweets = asyncHandler(async (req,res) => {
    const { page = 1, limit = 10, query, sortBy = 'createdAt', sortType = "desc", userId } = req.query

    let filter = {}
    if (query) {
        filter.content = { $regex: query, $options: 'i' };
    }
    if (userId) {
        filter.owner = userId
    }

    let sort = {}
    sort[sortBy] = sortType === 'asc' ? 1 : -1

    const aggregate = [
        { $match: filter },
        { $sort: sort },
    ]
    const options = {
        page: Number(page),
        limit: Number(limit),
    };

    const tweets = await Tweet.aggregatePaginate(aggregate, options);
    if (!tweets) {
        throw new ApiError(404, "Tweets not found")
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                tweets: tweets.docs,
                CountTweets: tweets.totalDocs,
                totalPages: tweets.totalPages
            },
            "All tweets fetched"))

});

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet,
    getAllTweets
}