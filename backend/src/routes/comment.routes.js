import { Router } from 'express';
import {
    addVideoComment,
    deleteVideoComment,
    getVideoComments,
    updateVideoComment,
} from "../controllers/comment.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/:videoId").get(getVideoComments).post(addVideoComment);
router.route("/c/:commentId").delete(deleteVideoComment).patch(updateVideoComment);

export default router