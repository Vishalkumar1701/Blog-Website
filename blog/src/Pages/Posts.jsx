import React from 'react'
import { Sidebar, Button, TextInput, Card } from 'flowbite-react'
import { HiUser, HiArrowSmRight, HiSearch } from 'react-icons/hi'
import food from '../assets/images/food.jpg'
import business from '../assets/images/business.jpg'

const Posts = () => {
  return (
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
              <Button gradientMonochrome="success" className='w-full'>
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
  )
}

export default Posts
