import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { Alert, Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import OAuth from '../Component/OAuth';

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(formData), 
      });
      const data = await res.json()
      if(data.success === false){
        setErrorMessage(data.message)
      }
      setLoading(false);
      navigate('/sign-in')
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <div className='bg-slate-200 min-h-screen'>
      <div className='pt-24 font-bold lg:text-5xl md:text-4xl text-center'>
        <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white px-2 py-1'>Writers</span>
        <span className=''>Wanderlust</span>
      </div>
      <div>
        <h2 className='text-xl font-bold text-center py-10'>Sign Up</h2>
      </div>

      <div className="form flex justify-center">
        <Card className="max-w-sm w-full mx-auto">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Enter Email" />
              </div>
              <TextInput id="email" type="email" placeholder="name@gmail.com" required onChange={handleChange} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Enter Username" />
              </div>
              <TextInput id="username" type="text" placeholder="Username" required onChange={handleChange} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Enter Password" />
              </div>
              <TextInput id="password" type="password" placeholder="Password" required onChange={handleChange} />
            </div>

            <Button gradientDuoTone='purpleToPink' type="submit">
              {
                loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Sign Up'
              }
            </Button>
            <OAuth/>
          </form>
          <div>
            <span className="">Having an account?
               <Link to='/sign-in' className='pl-2 text-blue-500'>Sign In</Link>
            </span>
          </div>
          {
          errorMessage && (
            <Alert className='mt-5' color= 'failure'>
              {errorMessage}
            </Alert>
          )
        }
        </Card>
      </div>
    </div>

  )
}

export default Signup
