import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createPost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/createpost', verifyToken, createPost);

export default router;