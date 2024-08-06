import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Dashsidebar from '../Component/Dashsidebar'
import Dashprofile from '../Component/Dashprofile'
import Userdashboard from '../Component/Userdashboard'
import Posts from '../Pages/Posts'

const Dashboard = () => {
    const location = useLocation()
    const [tab, setTab] = useState('')
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if(tabFromUrl){
            setTab(tabFromUrl);
        }

    },[location.search])
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
