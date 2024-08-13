import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'

import Header from './Component/Header'
import About from './Pages/About'
import Dashboard from './Pages/Dashboard'
import Footer from './Component/Footer'
import PrivateRoute from './Component/PrivateRoute'
import AdminPrivateRoute from './Component/AdminPrivateRoute'
import CompletePost from './Pages/completePost'
import UpdatePost from './Pages/UpdatePost'



const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/update-post/:postId' element= {<UpdatePost />} />
          <Route path='/post/:postSlug' element={<CompletePost />} />
          {/* <Route path='/search' element={<Search/>} /> */}
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
