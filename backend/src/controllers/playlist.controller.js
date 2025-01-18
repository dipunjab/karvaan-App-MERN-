import mongoose, { isValidObjectId } from "mongoose"
import { Playlist } from "../models/playlist.model.js"
import { User } from "../models/user.model.js"
import { Video } from "../models/video.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body
    if (
        [name, description].some((field) => field.trim() === "")
    ) {
        throw new ApiError(404, "All fields are required")
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user._id
    });
    if (!playlist) {
        throw new ApiError(400, "Failed to create Playlist")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Playlist created successfully"))
});


const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params
    if (!isValidObjectId(userId)) {
        throw new ApiError(401, "Invalid user id")
    }
    const findUser = await User.findById(userId)
    if (!findUser) {
        throw new ApiError(401, "User doen not exists")
    }

    const playlists = await Playlist.find({
        owner: userId
    });
    if (!playlists) {
        throw new ApiError(401, "Failed to get user playlists")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, playlists, "User Playlists fetched successfully"))
});

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(401, "InValid Playlist ID")
    }

    const playList = await Playlist.findById(playlistId)
    if (!playList) {
        throw new ApiError(400, "Failed to get playlist by Id")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, playList, "Playlist fetched successfully"))
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(404, "Invalid Object Id")
    }
    if (!isValidObjectId(videoId)) {
        throw new ApiError(404, "Invalid Object Id")
    }

    const findVideo = await Video.findById(videoId)
    if (!findVideo) {
        throw new ApiError(400, "Video does not exist to add in playlist")
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $addToSet: {
                videos: videoId
            }
        },
        {
            new: true
        }
    )
    if (!playlist) {
        throw new ApiError(400, "Failed to add Video to  playlist")
    }

    return res  
        .status(200)
        .json(new ApiResponse(200, playlist, "Video added to playlist successfully"))
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(404, "Invalid Object Id")
    }
    if (!isValidObjectId(videoId)) {
        throw new ApiError(404, "Invalid Object Id")
    }

    const playlistOwner = await Playlist.findById(playlistId)
    if (playlistOwner.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "You dont have permission to update This playlist")
    }

    const findVideo = await Video.findById(videoId)
    if (!findVideo) {
        throw new ApiError(400, "Video does not exist to remove from  playlist")
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pull: {
                videos: videoId
            }
        },
        {
            new: true
        }
    )
    if (!playlist) {
        throw new ApiError(400, "Failed to remove Video to  playlist")
    }

    return res  
        .status(200)
        .json(new ApiResponse(200, playlist, "Video removed from playlist successfully"))
});

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(404, "Invalid Object Id")
    }
    const playlistOwner = await Playlist.findById(playlistId)
    if (playlistOwner.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "You dont have permission to update This playlist")
    }
    const playlist = await Playlist.findByIdAndDelete(playlistId)
    if (!playlist) {
        throw new ApiError(400, "Failed to Delete  playlist")
    }

    return res  
        .status(200)
        .json(new ApiResponse(200, playlist, "Playlist Deleted successfully"))
});

const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    const { name, description } = req.body
    if (
        [name, description].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(404, "All fields are required")
    }
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(404, "Invalid Object Id")
    }
    const playlistOwner = await Playlist.findById(playlistId)
    if (playlistOwner.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "You dont have permission to update This playlist")
    }

    const playlist = await Playlist.findByIdAndUpdate(playlistId,
        {
            $set: {
                name,
                description
            }
        },{
            new: true
        }
    )
    if (!playlist) {
        throw new ApiError(400, "Failed to update  playlist")
    }

    return res  
        .status(200)
        .json(new ApiResponse(200, playlist, "Playlist updated successfully"))
});

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}