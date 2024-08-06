import React from 'react'
import mainimg from '../assets/images/main.jpg'

const Home = () => {
  return (
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

      <div>
      </div>
    </div>
  )
}

export default Home
