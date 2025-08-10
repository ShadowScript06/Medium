import React from 'react'
import Quote from '../components/Quote'
import SignupForm from '../components/SignupForm'


function Signup() {
  return (
    <div className='flex justify-between w-full'>
        <SignupForm/>
        <Quote/>
    </div>
  )
}

export default Signup