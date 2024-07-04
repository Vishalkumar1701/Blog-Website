import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { Alert, Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../Redux/user/userSlice';
import OAuth from '../Component/OAuth';


const Signin = () => {

  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart())

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <div className='bg-slate-200 min-h-screen'>
      <div className='pt-24 font-bold lg:text-5xl md:text-4xl text-center'>
        <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white px-2 py-1'>Writers</span>
        <span className=''>Wanderlust</span>
      </div>
      <div>
        <h2 className='text-xl font-bold text-center py-10'>Welcome</h2>
      </div>

      <div className="form flex justify-center">
        <Card className="max-w-sm w-full mx-auto">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Enter Email" />
              </div>
              <TextInput id="email" type="email" placeholder="xyz@gmail.com" required onChange={handleChange} />
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
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : ('Log In')
              }
            </Button>
            <OAuth/>
          </form>
          <div>
            <span className="">Don't have an account?
              <Link to='/sign-up' className='pl-2 text-blue-500'>Sign Up</Link>
            </span>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </Card>
      </div>
    </div>
  )
}

export default Signin
