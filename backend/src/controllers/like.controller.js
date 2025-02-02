import mongoose, { isValidObjectId } from "mongoose"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid Video Object Id")
    }

    const existingLike = await Like.findOne({
        video: videoId,
        likedBy: req.user._id
    });
    if (existingLike) {
        const deleteLike = await Like.findByIdAndDelete(existingLike._id);
        return res
            .status(200)
            .json(new ApiResponse(200, deleteLike, "Successfully unliked the video."));
    } else {
        const createLike = await Like.create({
            video: videoId,
            likedBy: req.user._id
        });
        return res
            .status(200)
            .json(new ApiResponse(200, createLike, "Successfully liked the video."));
    }
});

const getTotalVideoLikes = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid Video Object Id");
    }

    const totalLikes = await Like.countDocuments({ video: videoId });

    return res.status(200).json(
        new ApiResponse(200, { totalLikes }, "Successfully fetched total likes for videos.")
    );
});


const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment Object Id")
    }

    const existingLike = await Like.findOne({
        comment: commentId,
        likedBy: req.user._id
    });
    if (existingLike) {
        const deleteLike = await Like.findByIdAndDelete(existingLike._id);
        return res
            .status(200)
            .json(new ApiResponse(200, deleteLike, "Successfully unliked the comment."));
    } else {
        const createLike = await Like.create({
            comment: commentId,
            likedBy: req.user._id
        });
        return res
            .status(200)
            .json(new ApiResponse(200, createLike, "Successfully liked the comment."));
    }
});
const getTotalCommentLikes = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid Comment Object Id");
    }

    const totalLikes = await Like.countDocuments({ comment: commentId });

    return res.status(200).json(
        new ApiResponse(200, { totalLikes }, "Successfully fetched total likes for Comments.")
    );
});

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet Object Id")
    }

    const existingLike = await Like.findOne({
        tweet: tweetId,
        likedBy: req.user._id
    });
    if (existingLike) {
        const deleteLike = await Like.findByIdAndDelete(existingLike._id);
        return res
            .status(200)
            .json(new ApiResponse(200, deleteLike, "Successfully unliked the tweet."));
    } else {
        const createLike = await Like.create({
            tweet: tweetId,
            likedBy: req.user._id
        });
        return res
            .status(200)
            .json(new ApiResponse(200, createLike, "Successfully liked the tweet."));
    }
}
);
const getTotalTweetLikes = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid Video Object Id");
    }

    const totalLikes = await Like.countDocuments({ tweet: tweetId });

    return res.status(200).json(
        new ApiResponse(200, { totalLikes }, "Successfully fetched total likes for tweets.")
    );
});

const getLikedVideos = asyncHandler(async (req, res) => {

    const likedVideos = await Like.aggregate([
        {
            $match: {
                likedBy: req.user._id
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "likedVideoDetail"
            }
        },
        {
            $unwind: "$likedVideoDetail"
        },
        {
            $project: {
                _id: 1,
                likedVideoDetail: 1
            }
        }
    ])


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                likedVideos,
                "Liked videos fetched successully"
            )
        )

});

const statusOfVideoLikeByUser = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const like = await Like.findOne({video: videoId,
        likedBy: req.user._id});

    if (like) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { isLiked: true },
                    "User Like for videos fetched successully"
                )
            )
    } else {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { isLiked: false },
                    "User Like for videos fetched successully"
                )
            )
    }
});
const statusOfCommentLikeByUser = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const like = await Like.findOne({comment: commentId,
        likedBy: req.user._id});

    if (like) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { isLiked: true },
                    "User Like for comment fetched successully"
                )
            )
    } else {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { isLiked: false },
                    "User Like for comment fetched successully"
                )
            )
    }
});
const statusOfTweetLikeByUser = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const like = await Like.findOne({tweet: tweetId,
        likedBy: req.user._id});

    if (like) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { isLiked: true },
                    "User Like for comment fetched successully"
                )
            )
    } else {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { isLiked: false },
                    "User Like for comment fetched successully"
                )
            )
    }
});



export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getTotalVideoLikes,
    getTotalCommentLikes,
    getTotalTweetLikes,
    getLikedVideos,
    statusOfVideoLikeByUser,
    statusOfCommentLikeByUser,
    statusOfTweetLikeByUser
}