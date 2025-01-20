import mongoose, { isValidObjectId } from "mongoose"
import { Comment } from "../models/comment.model.js"
import { Video } from "../models/video.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(401, "Invalid ObjectId");
    }

    const findVideo = await Video.findById(videoId);
    // console.log("Find video: ",findVideo);
    
    if (!findVideo) {
        throw new ApiError(404, "Video does not exist");
    }


    const options = {
        page: Number(page),
        limit: Number(limit)
    }

    const comment  = await Comment.find({video: findVideo._id})
    
    const aggregate = [
        {
             $match: {
                video:  new mongoose.Types.ObjectId(videoId),
            }
        },
        {
            $project: {
                _id: 1,
                video: 1,
                content: 1,
                commentBy: 1,
                createdAt: 1,
            }
        },
        {
             $sort: { createdAt: -1 } 
        }
    ]
    
    const getComments = await Comment.aggregatePaginate(aggregate, options)
    
    res.status(200).json(
        new ApiResponse(
            200, {
            data: getComments.docs,
            CountComments: getComments.totalDocs,
            totalPages: getComments.totalPages
        },
            "Comments fetched Successfully"
        )
    );
});

const addVideoComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { content } = req.body;
    if (content.trim() === "") {
        throw new ApiError(404, "Content is required")
    }

    const comment = await Comment.create({
        content: content,
        video: videoId,
        commentBy: req.user._id
    });
    console.log("comment: ", comment);
    
    if (!comment) {
        throw new ApiError(401, "Failed to create Comment")
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            comment,
            "Comment added successfully"
        ))

});

const updateVideoComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    const { content } = req.body
    if (!content.trim() === "") {
        throw new ApiError(400, "Content is required to update")
    }

    if (!isValidObjectId(commentId)) {
        throw new ApiError(401, "Invalid object Id")
    }
    const findComment = await Comment.findById(commentId)
    if (!findComment) {
        throw new ApiError(401, "Comment does not exist")
    }

    if (findComment.commentBy.toString() !== req.user._id.toString()) {
        throw new ApiError(400, "You dont have permission to update this comment")
    }

    const comment = await Comment.findByIdAndUpdate(
        commentId,
        {
            $set: {
                content: content
            }
        },
        {
            new: true
        }
    )
    if (!comment) {
        throw new ApiError(400, "Failed to update Comment")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, comment, "Comment updated successfully"))
});

const deleteVideoComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    if (!isValidObjectId(commentId)) {
        throw new ApiError(401, "Invalid object Id")
    }

    const findComment = await Comment.findById(commentId)
    if (!findComment) {
        throw new ApiError(401, "Comment does not exist")
    }

    if (findComment.commentBy.toString() !== req.user._id.toString()) {
        throw new ApiError(400, "You dont have permission to delete this comment")
    }

    const comment = await Comment.findByIdAndDelete(commentId)
    if (!comment) {
        throw new ApiError(400, "Failed to delete Comment")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, comment, "Comment deleted successfully"))
});

export {
    //videos comments
    getVideoComments,
    addVideoComment,
    updateVideoComment,
    deleteVideoComment,
}