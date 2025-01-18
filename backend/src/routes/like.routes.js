import { Router } from 'express';
import {
    getLikedVideos,
    toggleCommentLike,
    toggleVideoLike,
    toggleTweetLike,
    getTotalVideoLikes,
    getTotalCommentLikes,
    getTotalTweetLikes
} from "../controllers/like.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/toggle/v/:videoId").post(toggleVideoLike).get(getTotalVideoLikes);
router.route("/toggle/c/:commentId").post(toggleCommentLike).get(getTotalCommentLikes);
router.route("/toggle/t/:tweetId").post(toggleTweetLike).get(getTotalTweetLikes);
router.route("/videos").get(getLikedVideos);

export default router