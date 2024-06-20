import React from 'react'

import { Navbar, TextInput, Button } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'


const Header = () => {
    const path = useLocation().pathname;

  return (
    <div>
      <Navbar className='border-b-2 fixed w-screen top-0 z-50'>
        <Link to= "/" className='font-semibold self-center whitespace-nowrap text-sm dark:text-white'>
            <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white px-2 py-1'>Writers</span>
            <span className=''>Wanderlust</span>
        </Link>
        <form>
            <TextInput 
                type='text'
                placeholder='Search...'
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
            />
            
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch/>
            </Button>
        <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                    <FaMoon />
                </Button>
                <Link to='/sign-in'>
                    <Button className='' gradientDuoTone='purpleToBlue' outline>
                        Sign In
                    </Button>
                </Link>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                    <Navbar.Link active={path === '/'} as={'div'}>
                        <Link to='/'>
                            Home
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/blog-post'} as={'div'}>
                        <Link to='/blog-post'>
                            Posts
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/blog-post'} as={'div'}>
                        <Link to='/about'>
                            About
                        </Link>
                    </Navbar.Link>
                </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
