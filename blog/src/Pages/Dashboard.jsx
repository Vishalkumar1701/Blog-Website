import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Dashsidebar from '../Component/Dashsidebar'
import Dashprofile from '../Component/Dashprofile'
import Userdashboard from '../Component/Userdashboard'
import Posts from '../Pages/Posts'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [tab, setTab] = useState('')
    const {currentUser} = useSelector((state) => state.user);
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if(tabFromUrl){
            if((tabFromUrl === 'users') && !currentUser.isAdmin){
                navigate('/dashboard?tab=profile');
            }else{
                setTab(tabFromUrl)
            }
        }

    },[location.search, currentUser, navigate])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
        <div className="md:w-56">
            {/* sidebar */}
            <Dashsidebar/>
        </div>
        {/* Profile  */}
        {tab === 'profile' && <Dashprofile/>}
        {tab === 'posts' && <Posts/>}
        {tab === 'users' && <Userdashboard/>}
    </div>
  )
}

export default Dashboard
