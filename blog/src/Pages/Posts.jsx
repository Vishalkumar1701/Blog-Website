import React, {useState} from 'react'
import { Sidebar, Button, TextInput, Card, Modal, Select, FileInput, Alert } from 'flowbite-react'
import { HiSearch } from 'react-icons/hi'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import food from '../assets/images/food.jpg'
const Posts = () => {
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);


  const handleUploadImage = ()=> {
    try {
      if(!file){
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' +file.name;
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
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({...formData, image: downloadUrl});
          });
        }
      )
    } catch (error) {
      setImageUploadError('image upload failed');
      setImageUploadProgress(null);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/createpost',{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok){
        setPublishError(data.message)
        return
      }
      if(data.success === false) {
        setPublishError(data.message);
        return;
      }
      if(res.ok){
        setPublishError(null)
        setFormData(null);

      }
    } catch (error) {
      setPublishError('Something went wrong')
    }
  }

  return (
    <>
    
    <div className='md:flex md:gap-4'>
      <div className="sidebar md:min-h-screen">
        <Sidebar className='w-full md:w-56 md:h-screen '>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <div className="flex items-center">
                <TextInput
                  icon={HiSearch}
                  type="search"
                  placeholder="Search"
                  className="w-full"
                />
              </div>
              <Button gradientMonochrome="success" className='w-full' onClick={()=>setOpenModal(true)}>
                Write a blog
              </Button>

            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      <div className="mainarea flex flex-wrap gap-4 p-6 sm:justify-center">
        <Card  className="w-80 h-fit hover:cursor-pointer">
          <img
            alt="Meaningful alt text for an image that is not purely decorative"
            src={food}
            className="w-full h-48 object-cover rounded-xl"
          />
          <div className="">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Title
            </h5>
            <p className="my-2 font-normal text-gray-700 dark:text-gray-400">
              Blog Description
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Tags
            </p>
          </div>
        </Card>

      </div>
    </div>
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Write a Blog</Modal.Header>
        <Modal.Body>
          <form action="" onSubmit={handleSubmit}>
            <div className='mb-3'>
              <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e) => {
                setFormData({...formData, title: e.target.value})
              }} />
            </div>

            <Select className='mb-3' onChange={(e) => {
              setFormData({...formData, category: e.target.value})
            }}>
                <option value="uncategorized" >Select a Category</option>
                <option value="Travel" >Travel</option>
                <option value="Business" >Business</option>
                <option value="Food" >Food</option>
                <option value="Health" >Health</option>
                <option value="BookReview" >BookReview</option>
              </Select>

              <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 rounded-lg mb-3'>
                <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])}/>
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
                setFormData({...formData, content: value})
              }}/>
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
