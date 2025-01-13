import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while genereting Tokens R&A")
    }
};


const registerUser = asyncHandler(async (req, res) => {
    // get user detail
    // validation for detail - not empty
    // check if user already exist: with username and email
    // check for images and compulosry avatar
    // upload images to cloudinary
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // if created then return response

    const { fullname, username, email, password } = req.body
    // console.log("REquest Body: ", req.body);

    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All Fields are Required");
    }


    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User Already Exists with this Username/Email");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // console.log("REq Files: ", req.files)
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar File Is Required-");
    }
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if (!avatar) {
        throw new ApiError(400, "Avatar File Failed to upload on Cloudinary");
    }
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        username: username.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registring the user.");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully.")
    )

});

const loginUser = asyncHandler(async (req, res) => {
    // data from req body
    // username or email
    // find the user
    // match the password
    // access and refresh token
    // send in cookies
    // response 

    const { username, email, password } = req.body

    if (!(username || email)) {
        throw new ApiError(400, "Username/Email is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (!user) {
        throw new ApiError(404, "User does not exist :(")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid User credentials :(")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    // when sending cookies
    const options = {
        httpOnly: true,
        secure: true
    }


    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User LoggedIn successfully")
        )

});


const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        }, {
        new: true
    }
    )

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logged Out successfully"))
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Request Token is not Correct -userController/refreshAccessToken")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)
        if (!user) {
            throw new ApiError(401, "Invalid Refresh Token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired")
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id)

        const option = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", newRefreshToken, option)
            .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access Token Refreshed Successfully"))
    } catch (error) {
        throw new ApiError(401, error.message || "Invalid Refresh token")
    }
});

const changeCurrentPassword = asyncHandler(async (req,res) => {
    const {oldPassword, newPassword} = req.body;

    const user = await User.findById(req.user._id)
    const isPasswordCorrect = user.isPasswordCorrect(oldPassword)
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password Changed Successfully"))
});

const getCurrentUser = asyncHandler(async (req,res) => {
   return res
        .status(200)
        .json(new ApiResponse(
            200,
             req.user,
            "Current user fetched Successfully"))
});

const updateAccountDetails = asyncHandler(async (req,res) => {
   
    const {fullname, email} = req.body
    if (!fullname || !email) {
        throw new ApiError(400, "All Fields are Required")
    }

    const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    fullname: fullname,
                    email: email
                }
            },
            {
                new: true
            }
        ).select("-password")
    
    return res
        .status(200)
        .json(new ApiResponse(
            200,
             user,
            "Account Details Updated Successfully"))
});

//TODO: Delete old Avatar from cloudinary
const updateUserAvatar = asyncHandler(async (req,res) => {
   const avatarLocalPath = req.file?.path

   if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing")
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath)
   if (!avatar.url) {
    throw new ApiError(400, "Erro while uploading Avatar file")
   }
    
   const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
        $set: {
            avatar: avatar.url
        }
    },
    {
        new: true
    }
   ).select("-password")

   return res
         .status(200)
         .json(new ApiResponse(
             200,
              user,
             "Avatar Updated Successfully"))
});

//TODO: Delete old coverImage from cloudinary
const updateUserCoverImage = asyncHandler(async (req,res) => {
   const coverImageLocalPath = req.file?.path

   if (!coverImageLocalPath) {
    throw new ApiError(400, "coverImage file is missing")
   }

   const coverImage = await uploadOnCloudinary(coverImageLocalPath)
   if (!coverImage.url) {
    throw new ApiError(400, "Erro while uploading coverImage file")
   }
    
   const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
        $set: {
            coverImage: coverImage.url
        }
    },
    {
        new: true
    }
   ).select("-password")

   return res
         .status(200)
         .json(new ApiResponse(
             200,
              user,
             "coverImage Updated Successfully"))
});

const getUserChannelProfile = asyncHandler(async (req,res) => {
    const { username } = req.params 
    if (!username?.trim()) {
        throw new ApiError(400, "username is missing")
    }

    const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase()
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }   
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: {$in: [req.user?._id, "subscribers.subscriber"]},
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                fullname: 1,
                username: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 2,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
                email: 1
            }
        }
    ]);

    // console.log(channel);
    
    if (!channel?.length) {
        throw new ApiError(400, "Channel does not exists")
    }


    return res 
        .status(200)
        .json(new ApiResponse(200, channel[0], "User channel fetched successfully"))
});

const getWatchHistory = asyncHandler(async (req,res) => {
    const user = await User.aggregate([
        {
            $match: {
                //as the id in mongodb is stored in objectId(userid) so for other cases mongoose fixed this by itself but now there is no such work for mongoose so we will use this way
                _id: new mongoose.Types.ObjectId(req.user._id)

            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullname: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            owner: {
                                $first: "$owner"
                            }
                        }
                    }
                ]
            }
        }
    ]);

    return res.status(200).json(new ApiResponse(200, user[0].watchHistory, "Watch History Fetched Successfully"))
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
}