import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js"
import { createMatchFunction } from "../utils/matchCloudinaryRegex.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy = 'createdAt', sortType = "desc", userId } = req.query

    // const user = await User.findById(userId)

    let filter = {}
    if (query) {
        filter.title = { $regex: query, $options: 'i' };
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

    const videos = await Video.aggregatePaginate(aggregate, options);
    if (!videos) {
        throw new ApiError(404, "Videos not found")
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                videos: videos.docs,
                CountVideos: videos.totalDocs,
                totalPages: videos.totalPages
            },
            "All videos fetched"))
});

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    if (
        [title, description].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(404, "All Fields are required.")
    }

    const videoFile = req.files?.videoFile[0].path


    if (!videoFile) {
        throw new ApiError(404, "Video File is required.")
    }

    const thumbnailFile = req.files?.thumbnail[0].path
    if (!thumbnailFile) {
        throw new ApiError(404, "thumbnail File is required.")
    }

    const video = await uploadOnCloudinary(videoFile)
    if (!video) {
        throw new ApiError(400, "Video File failed to upload on cloudinary.")
    }
    const thumbnail = await uploadOnCloudinary(thumbnailFile)
    if (!thumbnail) {
        throw new ApiError(404, "Thumbnail File failed to upload on cloudinary.")
    }

    const videoData = await Video.create({
        videoFile: video.url,
        thumbnail: thumbnail.url,
        title: title,
        description: description,
        duration: video.duration,
        owner: req.user._id
    });

    if (!videoData) {
        throw new ApiError(400, "failed to upload video")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, videoData, "Video uploaded Successfully"))

});

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: {
                watchHistory: videoId
            }
        }
    )
    
    await Video.findByIdAndUpdate(
        videoId,
        {
            $inc: { views: 1 }
        },
        {
            new: true
        }
    );

    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(400, "Video not Found.")
    }
    return res

        .status(200)
        .json(new ApiResponse(200, video, "Video fetched Successfully"))
});

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { title, description } = req.body

    const findVideo = await Video.findById(videoId)
    if (!findVideo) {
        throw new ApiError(404, "Requested Video was not found")
    }

    if (findVideo.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You Dont have permission to update this video")
    }

    //handling thumbnail
    const thumbnailFile = req.file?.path
    // console.log(req.file);
    let oldThumbnail = await findVideo.thumbnail
    let newThumbnail = null

    if (thumbnailFile) {
        newThumbnail = await uploadOnCloudinary(thumbnailFile)
        if (!newThumbnail) {
            throw new ApiError(400, "Failed to upload updated thumbnail on cloudinary")
        }
    }

    if (newThumbnail && oldThumbnail) {
        const thumbnailId = createMatchFunction(oldThumbnail)
        if (thumbnailId) {
            await deleteFromCloudinary(thumbnailId)
        }
    }


    const updateVideo = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                title: title,
                description: description,
                thumbnail: newThumbnail ?
                    newThumbnail.url
                    : oldThumbnail
            }
        },
        {
            new: true
        }
    );

    if (!updateVideo) {
        throw new ApiError(400, "Failed to update Video")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updateVideo, "Video updated Successfully"))
});

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    const video = await Video.findById(videoId)
    // console.log("Video Data: ", video);

    if (!video) {
        throw new ApiError(404, "Video not exist")
    }
    if (video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You Dont have permission to delete this video")
    }

    const videoFile = video.videoFile
    // console.log("VideoFile: ", videoFile);

    const thumbnail = video.thumbnail
    // console.log("ThumbnailFile: ", thumbnail);


    const thumbnaiId = createMatchFunction(thumbnail)
    // console.log("Thumbnail-ID: ", thumbnaiId);

    const videoFileId = createMatchFunction(videoFile)
    // console.log("Video-ID: ", videoFileId);

    if (thumbnail) {
        const thumbnailDeleted = await deleteFromCloudinary(thumbnaiId)
        // console.log("Thumbnai-Deleted: ", thumbnailDeleted);

        if (!thumbnailDeleted) {
            throw new ApiError(400, "Failed to delete thumbnail from cloudinary while deleting Video")
        }
    }

    const videoFileDeleted = await deleteFromCloudinary(videoFileId, "video");
    // console.log('Video-Deletion:', videoFileDeleted)

    if (!videoFileDeleted) {
        throw new ApiError(400, "Failed to delete video from cloudinary while deleting Video")
    }


    const deletedVideoData = await Video.findByIdAndDelete(videoId)
    if (!deletedVideoData) {
        throw new ApiError(400, "Failed to delete Video from DB")
    }


    return res
        .status(200)
        .json(new ApiResponse(200, deletedVideoData, "Video deleted Successfully"))
});

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(404, "Video not found")
    }

    const videoToggled = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                isPublished: !video.isPublished
            }
        },
        {
            new: true
        }
    )
    return res
        .status(200)
        .json(new ApiResponse(200, videoToggled, "Publish status toggled successfully"))
});


export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}