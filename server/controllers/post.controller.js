import { errorHandler } from "../utils/error.js"
import Post from "../models/post.model.js";

//Create a Post
export const createPost = async (req, res, next) => {
    if (!req.body.title || !req.body.content) {
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
};

export const getposts = async(req, res, next) => {
    
}

//Delete a Post
export const deletepost = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this post'));
    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json('The post has been deleted');
    } catch (error) {
        next(error);
    }
};

//Update a post
export const updatepost = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this post'));
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    category: req.body.category,
                    image: req.body.image,
                },
            },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
};