import React, { useState } from 'react'
import { Label, Textarea, Card, Button, Alert } from "flowbite-react";
import { useSelector } from 'react-redux';

const CommentsSection = ({ postId }) => {

    const{currentUser} = useSelector((state) => state.user);

    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setCommentError(null)
        try {
            if(comment.length > 200) {
                return
            }
            const res = await fetch('/api/comment/create',{
                method : 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({content: comment, postId, userId: currentUser._id})
            })
            const data = await res.json();
            console.log(data);
            if(res.ok){
                setComment('')
                setCommentError(null)
            }
            if(!res.ok) {
                setCommentError(data.message);
            }
        } catch (error) {
            setCommentError(error.message);
        }
    }

    return (
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
                        <Alert color='failure' className='mt-5'>
                            {commentError}
                        </Alert>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CommentsSection
