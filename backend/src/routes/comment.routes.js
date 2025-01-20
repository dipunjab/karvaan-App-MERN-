import { Router } from 'express';
import {
    addVideoComment,
    deleteVideoComment,
    getVideoComments,
    updateVideoComment,
    getTweetComments,
    addTweetComment,
    updateTweetComment,
    deleteTweetComment
} from "../controllers/comment.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file
//videos comments
router.route("/v/:videoId").get(getVideoComments).post(addVideoComment);
router.route("/c/v/:commentId").delete(deleteVideoComment).patch(updateVideoComment);

//tweet comments
router.route("/t/:tweetId").get(getTweetComments).post(addTweetComment);
router.route("/c/t/:commentId").delete(deleteTweetComment).patch(updateTweetComment);

export default router