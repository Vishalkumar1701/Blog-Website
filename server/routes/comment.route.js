import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createComment, deleteComment, editComment, likeComment, getComments, getPostComments } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/createcomment', verifyToken, createComment);
router.get('/getpostcomments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editcomment/:commentId', verifyToken, editComment);
router.delete('/deletecomment/:commentId', verifyToken, deleteComment);
router.get('/getcomments', verifyToken, getComments);



export default router;
