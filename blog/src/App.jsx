import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'

import Header from './Component/Header'
import Posts from './Pages/Posts'

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element= {<Home/>} />
        <Route path='/sign-in' element= {<Signin/>} />
        <Route path='/sign-up' element= {<Signup/>} />
        <Route path='/blog-post' element= {<Posts/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
