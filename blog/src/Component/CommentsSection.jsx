import React, { useState, useEffect } from 'react'
import { Label, Textarea, Card, Button, Alert } from "flowbite-react";
import { useSelector } from 'react-redux';
import Comments from './Comments';

const CommentsSection = ({ postId }) => {

    const { currentUser } = useSelector((state) => state.user);

    const [comment, setComment] = useState('');
    const [postComments, setPostComments] = useState([]);
    const [commentError, setCommentError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCommentError(null)
        try {
            if (comment.length > 200) {
                return
            }
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: comment, postId, userId: currentUser._id })
            })
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                setComment('')
                setCommentError(null)
                fetchComments();
                setComment([data, ...Comments])
            }
            if (!res.ok) {
                setCommentError(data.message);
            }
        } catch (error) {
            setCommentError(error.message);
        }
    }

    const fetchComments = async () => {
        try {
            const res = await fetch(`/api/comment/getPostComments/${postId}`);
            if (res.ok) {
                const data = await res.json();
                setPostComments(data);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        fetchComments()
    }, [])

    return (
        <>
            <div className='flex justify-center '>
                <div className="comment-area ">
                    <div className="min-w-96">
                        <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'>
                            <Textarea className='mb-5' id="comment" placeholder="Leave a comment..." required rows={4} maxLength={200} onChange={(e) => setComment(e.target.value)} value={comment} />
                            <div className="flex justify-between">
                                <span className='text-gray-500 text-xs'>
                                    {200 - comment.length} Characters remaining
                                </span>
                                <Button type='submit' gradientMonochrome='cyan'>
                                    Submit
                                </Button>
                            </div>
                            {commentError && (
                                <Alert color='failure' className='mt-5'>
                                    {commentError}
                                </Alert>)}
                        </form>
                    </div>
                </div>
            </div>
            <div className='all-comments'>
                {
                    postComments.length === 0 ? (
                        <p className='text-sm my-5'>No comments yet</p>
                    ) : (
                        <>
                            <div className="flex items-center">
                                <div className='flex items-center text-gray-300'>
                                    Comments
                                    <p className='ml-3 border border-gray-400 py-1 px-3 rounded-sm'>{postComments.length}</p>
                                </div>
                            </div>
                            <div>
                                {
                                    postComments.map(eachComment => (
                                        <Comments 
                                            key={eachComment._id}
                                            comment = {eachComment}
                                        />
                                    ))
                                }
                            </div>
                        </>
                    )
                }
            </div>
        </>

    )
}

export default CommentsSection
