import React, { useEffect, useState } from 'react'
import { Button, TextInput, Modal, Select, FileInput, Alert, Table, TableHead, TableBody, TableRow, TableCell, ModalHeader, ModalBody } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Link } from 'react-router-dom'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useSelector } from 'react-redux';


const Posts = () => {

  const { currentUser } = useSelector((state) => state.user)

  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [showUserPosts, setShowUserPosts] = useState(false);
  const [loading, setLoading] = useState(false);




  const handleUploadImage = () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image Upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData((prevformData) => ({ ...prevformData, image: downloadUrl }));
          });
        }
      )
    } catch (error) {
      setImageUploadError('image upload failed');
      setImageUploadProgress(null);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/createpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message)
        return
      }
      if (data.success === false) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null)
        setFormData({});
        fetchPostByUserId();
        setOpenModal(false);

      }
    } catch (error) {
      setPublishError('Something went wrong')
      console.log(error.message);
    }
  }

  const fetchPostByUserId = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
      const data = await res.json();
      console.log(data)
      if (res.ok) {
        setUserPosts(data.posts);
        setShowUserPosts(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchPostByUserId();
  }, [])

  return (
    <>
      <div className="w-full">
        <h2 className='text-5xl font-bold px-2 my-4 dark:text-gray-300 '>Posts</h2>
        <hr className='border-gray-400' />
        <div className="menubar flex p-3">
          <div className="createpost m-2">
            <Button gradientMonochrome="success" className='w-full' onClick={() => setOpenModal(true)}>
              Write a blog
            </Button>
          </div>
        </div>
        <div className=''>
          {loading ? (
            <div className='text-center'>Loading Blogs...</div>
          ) : (
            <>
              {showUserPosts && userPosts.length > 0 ? (
                <Table hoverable className='shadow-md'>
                  <Table.Head>
                    <Table.HeadCell>Date Updated</Table.HeadCell>
                    <Table.HeadCell>Post Image</Table.HeadCell>
                    <Table.HeadCell>Post Title</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                    {userPosts.map((post) => (
                      <Table.Row key={post._id}>
                        <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>
                          <Link to={`/post/${post.slug}`}>
                            <img src={post.image} alt={post.title} className='w-20 h-10 object-cover bg-gray-500' />
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <Link to={`/post/${post.slug}`} className='font-medium text-gray-700 dark:text-white'>
                            {post.title}
                          </Link>
                        </Table.Cell>
                        <Table.Cell>{post.category}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              ) : (
                <div>No posts found</div>
              )}
            </>
          )}
        </div>
      </div>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Write a Blog</Modal.Header>
        <Modal.Body>
          <form action="" onSubmit={handleSubmit}>
            <div className='mb-3'>
              <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e) => {
                setFormData((prevFormData) => ({ ...prevFormData, title: e.target.value }))
              }} />
            </div>

            <Select className='mb-3' onChange={(e) => {
              setFormData((prevFormData) => ({ ...prevFormData, category: e.target.value }));
            }}>
              <option value="uncategorized" >Select a Category</option>
              <option value="Travel" >Travel</option>
              <option value="Business" >Business</option>
              <option value="Food" >Food</option>
              <option value="Health" >Health</option>
              <option value="BookReview" >BookReview</option>
              <option value="Personal" >Personal</option>
              <option value="Educational" >Educational</option>
            </Select>

            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 rounded-lg mb-3'>
              <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
              <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress} >
                {
                  imageUploadProgress ?
                    <div className='w-16 h-16'>
                      <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                    </div> : 'Upload Image'
                }
              </Button>
            </div>
            {
              imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>
            }
            {
              formData.image && (
                <img src={formData.image} alt='upload' className='w-full h-72 object-cover' />
              )
            }
            <ReactQuill theme='snow' placeholder='Write Something' className='h-72 mb-12' required onChange={(value) => {
              setFormData((prevFormData) => ({ ...prevFormData, content: value }))
            }} />
            {
              publishError && <Alert className='mt-5'>{publishError}</Alert>
            }

            <Button type='submit' className='w-full'>Publish</Button>


          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Posts