import React from 'react'

import { Navbar, TextInput, Button, Dropdown, Avatar } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../Redux/theme/themeSlice'
import { signOutSuccess } from '../Redux/user/userSlice'


const Header = () => {
    const path = useLocation().pathname;
    const { currentUser } = useSelector(state => state.user)
    const { theme } = useSelector(state => state.theme);
    const dispatch = useDispatch();

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
        <div>
            <Navbar className='border-b-2'>
                <Link to="/" className='font-semibold self-center whitespace-nowrap text-sm dark:text-white'>
                    <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white px-2 py-1'>Writers</span>
                    <span className=''>Wanderlust</span>
                </Link>

                <div className='flex gap-4 md:order-2 items-center'>
                    <Link to='/post/search'>
                        <Button className='' pill outline gradientDuoTone='cyanToBlue'>
                            <AiOutlineSearch width='3rem' height='2.5rem' />
                        </Button>
                    </Link>

                    <Button className='w-12 h-10 hidden sm:inline' color='gray' pill
                        onClick={() => dispatch(toggleTheme())}
                    >
                        {
                            theme === 'light' ? <FaMoon /> : <FaSun />
                        }
                    </Button>

                    {
                        currentUser ? (
                            <Dropdown arrowIcon={false}
                                inline
                                label={
                                    <Avatar alt='user'
                                        img={currentUser.profilePicture} rounded />
                                }>
                                <Dropdown.Header>
                                    <span className='block text-sm mb-2'>@{currentUser.username}</span>
                                    <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                                </Dropdown.Header>
                                <Link to={'/dashboard?tab=profile'}>
                                    <Dropdown.Item>Profile</Dropdown.Item>
                                </Link>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>

                            </Dropdown>
                        )
                            : (
                                <Link to='/sign-in'>
                                    <Button className='' gradientDuoTone='purpleToBlue' outline>
                                        Sign In
                                    </Button>
                                </Link>)
                    }

                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link active={path === '/'} as={'div'}>
                        <Link to='/'>
                            Home
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/blog-post'} as={'div'}>
                        <Link to='/post/search'>
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
