import React, { useEffect, useState } from 'react'
import { Sidebar, Button, TextInput, Card, Modal, Select, FileInput, Alert, Table, TableHeadCell, TableHead, TableBody } from 'flowbite-react'
import { HiSearch } from 'react-icons/hi'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Link } from 'react-router-dom'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useSelector } from 'react-redux';
import food from '../assets/images/food.jpg'


const Posts = () => {

  const { currentUser } = useSelector((state) => state.user)

  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);




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

      }
    } catch (error) {
      setPublishError('Something went wrong')
    }
  }

  const fetchPostByUserId = async () => {
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
      const data = await res.json();
      if (res.ok) {
        setUserPosts(data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const fetchAllPosts = async () => {
    try {
      const res = await fetch('/api/post/getposts')
      const data = await res.json();
      if (res.ok) {
        setAllPosts(data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAllPosts();
  }, [])



  return (
    <>

      <div className='md:flex md:gap-4'>
        <div className="sidebar md:min-h-screen">
          <Sidebar className='w-full md:w-56 md:h-screen sticky top-0'>
            <Sidebar.Items>
              <Button gradientMonochrome="success" className='w-full' onClick={() => setOpenModal(true)}>
                Write a blog
              </Button>
              <Sidebar.ItemGroup>
                <div className="flex items-center">
                  <TextInput
                    icon={HiSearch}
                    type="search"
                    placeholder="Search"
                    className="w-full"
                  />
                </div>
                <Button gradientMonochrome="info" className='w-full' onClick={fetchPostByUserId}>
                  Show My Blogs
                </Button>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>
        <div className="mainarea w-full">
          <h2 className='text-5xl my-4 dark:text-gray-300 '>Posts</h2>
          <hr className='border-gray-400' />
          <div>
            {currentUser.isAdmin && userPosts.length > 0 ? (
              <div>
                <Table hoverable className='shadow-md'>
                  <TableHead>
                    <TableHeadCell>Date Updated</TableHeadCell>
                    <TableHeadCell>Post Image</TableHeadCell>
                    <TableHeadCell>Post Title</TableHeadCell>
                    <TableHeadCell>Category</TableHeadCell>
                    <TableHeadCell>Delete</TableHeadCell>
                    <TableHeadCell><span>Edit</span></TableHeadCell>
                  </TableHead>
                  {
                    userPosts.map((post) => (
                      <TableBody key={post._id}>
                        <Table.Row >
                          <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}
                          </Table.Cell>
                          <Table.Cell>
                            <Link to={`/blog-post/${post.slug}`} className='font-medium text-gray-900 dark:text-white' >
                              <img src={post.image} alt={post.title}
                                className='w-20 h-10 object-cover bg-gray-500 '
                              />
                            </Link>
                          </Table.Cell>
                          <Table.Cell>
                            <Link to={`/blog-post/${post.slug}`} className='font-medium text-gray-700 dark:text-white'> 
                              {post.title}
                            </Link>                            
                          </Table.Cell>
                          <Table.Cell>
                            {post.category}
                          </Table.Cell>
                          <Table.Cell>
                            <span className='font-medium text-red-500 hover:underline cursor-pointer'>
                              Delete
                            </span>
                          </Table.Cell>
                          <Table.Cell>
                            <Link to={`/update-post/${post._id}`} className='text-teal-500 hover:underline cursor-pointer'>
                              <span>Edit</span>
                            </Link>
                          </Table.Cell>
                        </Table.Row>
                      </TableBody>
                    ))}
                </Table>
              </div>
            ) : (
              <div>
                {
                  allPosts.length > 0 ? (
                    <div>
                      <Table hoverable className='shadow-md'>
                        <TableHead>
                          <TableHeadCell>Date Updated</TableHeadCell>
                          <TableHeadCell>Post Image</TableHeadCell>
                          <TableHeadCell>Post Title</TableHeadCell>
                          <TableHeadCell>Category</TableHeadCell>
                          <TableHeadCell>Delete</TableHeadCell>
                          <TableHeadCell><span>Edit</span></TableHeadCell>
                        </TableHead>
                        {
                          allPosts.map((post) => (
                            <TableBody key={post._id}>
                              <Table.Row >
                                <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>
                                  <Link to={`/blog-post/${post.slug}`} >
                                    <img src={post.image} alt={post.title}
                                      className='w-20 h-10 object-cover bg-gray-500 '
                                    />
                                  </Link>
                                </Table.Cell>
                                <Table.Cell>
                                <Link to={`/blog-post/${post.slug}`} className='font-medium text-gray-700 dark:text-white'> 
                              {post.title}
                            </Link>                            
                          </Table.Cell>
                                
                                <Table.Cell>
                                  {post.category}
                                </Table.Cell>
                                <Table.Cell>
                                  <span className='font-medium text-red-500 hover:underline cursor-pointer'>
                                    Delete
                                  </span>
                                </Table.Cell>
                                <Table.Cell>
                                  <Link to={`/update-post/${post._id}`} className='text-teal-500 hover:underline cursor-pointer'>
                                    <span>Edit</span>
                                  </Link>
                                </Table.Cell>
                              </Table.Row>
                            </TableBody>
                          ))}
                      </Table>
                    </div>
                  ) : (
                    <div>
                      No Posts Avilable
                    </div>
                  )
                }
              </div>
            )
            }
          </div>
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
