import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  updateStart,
  updateFailure,
  updateSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess,
} from '../Redux/user/userSlice'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const Dashprofile = () => {

  const { currentUser, error, loading } = useSelector(state => state.user)

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imagefileUploadProgress, setImagefileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({})
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModel] = useState(false);
  const filePickerRef = useRef();

  const dispatch = useDispatch();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagefileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError('Could not upload image (File must be less than 2 MB)');
        setImagefileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message))
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(data.message);
    }
  }

  const handleDeleteAccount = async () => {
    setShowModel(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message)
    }
  }


  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
        <div className='relative w-32 h-32 self-center cursor-pointer overflow-hidden shadow-md rounded-full' onClick={() => filePickerRef.current.click()}>

          {imagefileUploadProgress && (
            <CircularProgressbar value={imagefileUploadProgress || 0} text={`${imagefileUploadProgress}%`}
              strokeWidth={5}
              styles={
                {
                  root: {
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62,152,199, ${imagefileUploadProgress / 100})`,
                  },
                }
              }
            />
          )}

          <img src={imageFileUrl || currentUser.profilePicture} alt="user" className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imagefileUploadProgress && imagefileUploadProgress < 100 && 'opacity-60'}`} />

        </div>
        {
          imageFileUploadError &&
          <Alert color='failure'>
            {imageFileUploadError}
          </Alert>
        }
        <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username} onChange={handleChange} />

        <TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email} onChange={handleChange} />

        <TextInput type='password' id='password' placeholder='Password' onChange={handleChange} />

        <Button type='submit' gradientDuoTone='purpleToBlue' outline disabled={loading || imageFileUploading}> {loading ? 'Loading...' : 'Update'} </Button>
      </form>
      <Link to='/blog-post'>
        <Button gradientDuoTone="greenToBlue" className='mt-5 w-full'>
          Create A Post
        </Button>
      </Link>
      <div className="text-red-500 flex justify-between mt-5">
        <span className='cursor-pointer' onClick={() => setShowModel(true)}>
          Delete Account
        </span>
        <span className='cursor-pointer' onClick={handleSignOut}>
          Sign Out
        </span>
      </div>
      {
        updateUserSuccess && (
          <Alert color='success' className='mt-5'>
            {updateUserSuccess}
          </Alert>
        )
      }{
        updateUserError && (
          <Alert color='failure' className='mt-5'>
            {updateUserError}
          </Alert>
        )
      }
      {
        updateUserError && (
          <Alert color='failure' className='mt-5'>
            {error}
          </Alert>
        )
      }
      <Modal show={showModal} onClose={() => setShowModel(false)} popup size='md'>
        <Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'> Are you sure you want to delete your account</h3>
              <div className=" flex justify-center items-center gap-10">
                <Button color='failure' onClick={handleDeleteAccount}>
                  Yes, I am sure.
                </Button>
                <Button color='gray' onClick={() => setShowModel(false)}> Cancel </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    </div>
  )
}

export default Dashprofile
