import React, { useState, useEffect } from 'react'
import { Sidebar } from 'flowbite-react'
import { useDispatch } from 'react-redux'
import { HiUser, HiArrowSmRight, HiDocumentText } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { signOutSuccess } from '../Redux/user/userSlice'
const Dashsidebar = () => {

    const dispatch = useDispatch();

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
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark' as='div'>
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
