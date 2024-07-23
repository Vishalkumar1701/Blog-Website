import React, {useState} from 'react'
import { Sidebar, Button, TextInput, Card, Modal, Select, FileInput } from 'flowbite-react'
import { HiSearch } from 'react-icons/hi'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import food from '../assets/images/food.jpg'
import business from '../assets/images/business.jpg'

const Posts = () => {
  const [openModal, setOpenModal] = useState(false);

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
          <form action="">
            <div className='mb-3'>
              <TextInput type='text' placeholder='Title' required id='title' className='' />
            </div>

            <Select className='mb-3'>
                <option value="uncategorized" >Select a Category</option>
                <option value="Travel" >Travel</option>
                <option value="Business" >Business</option>
                <option value="Food" >Food</option>
                <option value="Health" >Health</option>
                <option value="BookReview" >BookReview</option>
              </Select>

              <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 rounded-lg mb-3'>
                <FileInput type='file' accept='image/*'/>
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline >
                  Upload Image
                </Button>
              </div>
              <ReactQuill theme='snow' placeholder='Write Something' className='h-72 mb-12'/>

              <Button type='submit' className='w-full' onClick={() => setOpenModal(false)}>Publish</Button>

          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Posts
