import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        author : {
            type: String,
            required: true,
        },
        content : {
            type: String,
            required: true,
        },
        title : {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type : String,
            default : 'https://img.freepik.com/free-photo/toy-bricks-table-with-word-blog_144627-47465.jpg?t=st=1721721840~exp=1721725440~hmac=be10ec7ebc2aa66c1bfac554eb672dd119317c2a32bd4e9ca077939a63f4dad3&w=1380'
        },
        category: {
            type : String,
            default: 'Uncategorized',
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        }
    },{
        timestamps:true
    }
);

const Post = mongoose.model('Post', postSchema);

export default Post;