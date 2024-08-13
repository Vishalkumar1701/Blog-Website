import React from 'react'
import mainimg from '../assets/images/main.jpg'
import { Card, Button } from "flowbite-react";
import book from '../assets/images/book vlog.jpg'
import food from '../assets/images/food vlog.jpg'
import health from '../assets/images/health vlogs.jpg'
import personal from '../assets/images/personal vlog.jpg'
import travel from '../assets/images/travel vlog.jpg'
import whyblog from '../assets/images/whyblog.png'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className=''>

      <div className='h-screen'
        style={{
          backgroundImage: `url(${mainimg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>

        <div className='bg-black h-screen bg-opacity-35'>
          <div className='pt-36 text-center font-bold text-white'>
            <span className='border-8 lg:text-7xl md:text-4xl border-slate-100 px-7 py-4'>Writers Wanderlust</span>
          </div>
          <p className='text-center pt-36 text-white text-xl'>Exploring Through Words and Journeys</p>
        </div>
      </div>

      <div className=' my-3 flex flex-wrap justify-evenly gap-4'>
        {/* Food  */}
        <Card
          className="max-w-sm overflow-hidden"
          renderImage={() => <img src={food} className='max-h-56 object-cover transition-transform duration-300 transform hover:scale-105' alt="image 1" />}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Food Vlog
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            "Every meal is a journey, a story told through flavors that dance on your taste buds and memories that linger long after the last bite."
          </p>
        </Card>

        <Card
          className="max-w-sm overflow-hidden"
          renderImage={() => <img src={book} className='min-h-56 object-cover transition-transform duration-300 transform hover:scale-105' alt="image 1" />}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Book Reviews
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            "Between the pages of a book, we find a universe of stories, each one a journey to the heart and mind of its author."
          </p>
        </Card>

        <Card
          className="max-w-sm overflow-hidden"
          renderImage={() => <img src={health} className='min-h-56 object-cover transition-transform duration-300 transform hover:scale-105' alt="image 1" />}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Health Vlogs
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            "Health is not just about the absence of illness; it's about thriving in mind, body, and spirit, embracing each day with vitality and joy."
          </p>
        </Card>

        <Card
          className="max-w-sm overflow-hidden"
          renderImage={() => <img src={personal} className='min-h-56 object-cover transition-transform duration-300 transform hover:scale-105' alt="image 1" />}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Personal Vlog
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            "We are dreamers and doers, passionate about sharing stories and experiences that inspire, connect, and transform."
          </p>
        </Card>

        <Card
          className="max-w-sm overflow-hidden"
          renderImage={() => <img src={travel} className='min-h-56 object-cover transition-transform duration-300 transform hover:scale-105' alt="image 1" />}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Travel Vlog
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            "Travel is the art of discovering new horizons and the thrill of finding home in the most unexpected places."
          </p>
        </Card>
      </div>

      <div className='about px-10 py-14 bg-gray-950 min-h-80 flex items-center justify-evenly flex-wrap gap-4'>
        <div className=' '>
          <div className=' flex flex-col items-center justify-center'>
            <h3 className='text-5xl text-white mb-4'> Why Blog?</h3>
            <p className='tracking-wide dark:text-white w-96'>
              Blogging serves as an effective platform for sharing knowledge, expressing creativity, and establishing an online presence...... </p>
          </div>
          <Link to='/about'>
            <Button className='float-right mr-6' pill outline>
              &darr; Read More
            </Button>
          </Link>

        </div>

        <div className=''>
          <img className='h-60 object-cover' src={whyblog} alt="whyblog" />
        </div>
      </div >
    </div >

  )
}

export default Home
