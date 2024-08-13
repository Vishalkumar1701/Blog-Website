import React, { useEffect, useState } from 'react'
import { Card, Spinner, Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiClock } from "react-icons/hi";
import { Badge } from "flowbite-react";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import CommentsSection from '../Component/CommentsSection';
import { useNavigate, Link } from 'react-router-dom';

const CompletePost = () => {

    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [postIdToDelete, setPostIdToDelete] = useState('');
    const [alertModal, setAlertModal] = useState(false);

    const postAuthor = post ? post.author : null;


    const fetchPost = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
            const data = await res.json();
            if (!res.ok) {
                setLoading(false);
                setError(true);
                return;
            }
            if (res.ok) {
                setPost(data.posts[0]);
                setError(false);
                setLoading(false);
                setPostIdToDelete(data.posts[0]._id)
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
    }
    useEffect(() => {
        fetchPost();
    }, [postSlug]);

    const editPost = async () => {

    }

    const deletePost = async () => {
        setAlertModal(false);
        try {
            const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            }
            else {
                navigate('/dashboard?tab=posts')
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    if (loading) return (
        <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='xl' />
        </div>
    )
    return (
        <main className='p-3'>
            <h1 className='text-3xl font-serif mt-10 p-3 text-center max-w-2xl mx-auto lg:text-4xl capitalize dark:text-white'>{post && post.title}</h1>

            <Card>
                <div className=''>
                    <img className='h-[40rem] w-full object-cover object-center' src={post && post.image} alt="blog-img" />
                </div>

                <div className='flex justify-between items-center'>
                    <div className="tags">
                        <Badge className='p-3' color="indigo" size="xl">
                            {post && post.category}
                        </Badge>
                    </div>
                    <div className="datetime">
                        <Badge className='p-3' color="gray" size="xl" icon={HiClock}>
                            {post && new Date(post.createdAt).toLocaleDateString('en-GB')}
                            <span className='ml-5'>
                                {post && (post.content.length / 1000).toFixed(0)} mins read
                            </span>
                        </Badge>
                    </div>
                </div>

                <div className='post-content font-normal text-gray-700 dark:text-white'
                    dangerouslySetInnerHTML={{
                        __html: post && post.content
                    }}
                >
                </div>
                {post && postAuthor === currentUser._id ? 
                    (<div className='flex justify-between'>
                        <Button className='font-bold '>
                            <Link to={`/update-post/${post._id}`} replace='true'>
                                Edit
                            </Link>
                        </Button>
                        <Button className='font-bold' color='failure' onClick={() => {
                            setAlertModal(true)
                            setPostIdToDelete(post._id);
                        }}>Delete</Button>
                    </div> ) : ''
                }
            </Card>
            <div className='py-5'>
                <span>Signed In as : <span>@{currentUser.username}</span></span>
            </div>
            <hr className='my-4' />
            <h2 className='text-5xl font-bold px-2 my-4 dark:text-gray-300 '>Comments</h2>

            <CommentsSection postId={post._id} />

            <Modal popup show={alertModal} onClose={() => setAlertModal(false)} size='md'>
                <ModalHeader>
                    Delete Post
                </ModalHeader>
                <ModalBody>
                    <h4 className='mb-4'>Are you sure you want to delete this post</h4>
                    <div className='flex justify-center gap-4'>
                        <Button color='failure' onClick={deletePost}>
                            Yes, I'm sure
                        </Button>

                        <Button color='gray' onClick={() => setAlertModal(false)}>
                            No, Cancel
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </main>
    )
}

export default CompletePost
