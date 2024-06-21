import React from 'react'
import { Link } from 'react-router-dom';

import { Button, Card, Label, TextInput } from "flowbite-react";


const Signin = () => {
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
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Enter Username" />
              </div>
              <TextInput id="username" type="text" placeholder="Username" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Enter Password" />
              </div>
              <TextInput id="password1" type="password" placeholder="Password" required />
            </div>

            <Button gradientDuoTone='purpleToPink' type="submit">Log In</Button>
          </form>
          <div>
            <span className="">Don't have an account?
              <Link to='/sign-up' className='pl-2 text-blue-500'>Sign Up</Link>
            </span>
          </div>
        </Card>
      </div>

    </div>
  )
}

export default Signin
