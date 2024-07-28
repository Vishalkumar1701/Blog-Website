import React, { useState, useEffect } from 'react'
import { Sidebar } from 'flowbite-react'
import { useDispatch } from 'react-redux'
import { HiUser, HiArrowSmRight, HiDocumentText } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { signOutSuccess } from '../Redux/user/userSlice'
import { useSelector } from 'react-redux'


const Dashsidebar = () => {

    const dispatch = useDispatch();
    const {currentUser} = useSelector((state) => state.user);

    const location = useLocation()
    const [tab, setTab] = useState('')
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }

    }, [location.search])

    const handleSignOut = async () => {
        try {
          const res = await fetch('/api/user/signout', {
            method: 'POST',
          });
          const data = await res.json();
          if(!res.ok) {
            console.log(data.message);
          } else{
            dispatch(signOutSuccess());
          }
        } catch (error) {
          console.log(error.message)
        }
      }

    return (
        <Sidebar className='w-full md:w-56 '>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark' as='div'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Link to='/dashboard?tab=posts'>
                        <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} labelColor='dark' as='div'>
                            Blogs
                        </Sidebar.Item>
                    </Link>
                    
                    <Sidebar.Item icon={HiArrowSmRight} labelColor='dark' onClick= {handleSignOut}>
                        Sign out
                    </Sidebar.Item>

                    

                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default Dashsidebar
