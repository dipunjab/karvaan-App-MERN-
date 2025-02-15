import { Router } from 'express';
import {
    deleteVideo,
    getAllVideos,
    getCurrUserVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
} from "../controllers/video.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {verifyJWTOptional} from "../middlewares/optionalJWT.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/").get(getAllVideos)

//as xpress will read from top to bottom so when i pt this under 3rd route the uservideos will be read as videoId
router.route("/uservideos").get(verifyJWT,getCurrUserVideos)

router
    .route("/:videoId")
    .get(verifyJWTOptional,getVideoById)

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file


router
    .route("/")
    .post(
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1,
            },
            
        ]),
        publishAVideo
    );

router
    .route("/:videoId")
    .delete(deleteVideo)
    .patch(upload.single("thumbnail"), updateVideo);

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router