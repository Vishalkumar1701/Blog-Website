import React, { useState, useEffect } from 'react'
import { Label, Textarea, Card, Button, Alert, Modal } from "flowbite-react";
import { useSelector } from 'react-redux';
import Comments from './Comments';
import { HiOutlineExclamationCircle } from 'react-icons/hi';


const CommentsSection = ({ postId }) => {

    const { currentUser } = useSelector((state) => state.user);

    const [comment, setComment] = useState('');
    const [postComments, setPostComments] = useState([]);
    const [commentError, setCommentError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCommentError(null)
        try {
            if (comment.length > 200) {
                return;
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
                setPostComments([data, ...postComments])
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

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                return;
            }
            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: 'PUT',
            });
            if (res.ok) {
                const data = await res.json();
                setPostComments(postComments.map((comment) =>
                    comment._id === commentId ? {
                        ...comment,
                        likes: data.likes,
                        numberOdLikes: data.likes.length,
                    } : comment
                ));
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const handleEdit = async (comment, editedContent) => {
        setPostComments(
            postComments.map((c) =>
                c._id === comment._id ? { ...c, content: editedContent } : c
            )
        );
    };

    const handleDelete = async (commentId) => {
        setShowModal(false);
        try {
            if (!currentUser) {
                return;
            }
            const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                const data = await res.json();
                setPostComments(postComments.filter((comment) => comment._id !== commentId));
            }
        } catch (error) {
            console.log(error.message);
        }
    };
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
            <div className='all-comments mt-5 ml-6 border border-gray-500 rounded-lg px-5 py-6'>
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
                                            comment={eachComment}
                                            onLike={handleLike}
                                            onEdit={handleEdit}
                                            onDelete={(commentId) => {
                                                setShowModal(true);
                                                setCommentToDelete(commentId);
                                            }}
                                        />
                                    ))
                                }
                            </div>
                        </>
                    )
                }
            </div>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete this comment?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button
                                color='failure'
                                onClick={() => handleDelete(commentToDelete)}
                            >
                                Yes, I'm sure
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )

}


export default CommentsSection
