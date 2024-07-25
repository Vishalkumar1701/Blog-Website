import { errorHandler } from "../utils/error.js"
import Post from "../models/post.model.js";

//Create a Post
export const createPost = async(req,res,next) => {
    if(!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'))
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

    const newPost = new Post({
        ...req.body, slug, author: req.user.id
    });
    try {
        const savedPost = await newPost.save();
        res.status(201).json({
            success: true,
            post: savedPost,
        });
    } catch (error) {
        next(error)
    }
}