import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext.jsx'

const UserSignUp = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  // yha user ko set kro 
  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {

    e.preventDefault();

    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if (response.status == 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('userToken', data.userToken)
      navigate('/home')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20  mb-3' src="/3.png" alt='Uber logo' />

        <form onSubmit={(e) => { submitHandler(e) }}>

          <h3 className='text-lg font-medium mb-2'>What's your name</h3>

          <div className='flex gap-4 mb-6'>
            <input
              required
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value) }}
              className='bg-[#eeeeee]   rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
              type="text"
              placeholder='First name' />

            <input
              required
              value={lastName}
              onChange={(e) => { setLastName(e.target.value) }}
              className='bg-[#eeeeee]   rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
              type="text"
              placeholder='Last name' />

          </div>


          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            className='bg-[#eeeeee]  mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email" placeholder='email@example.com' />

          <h3 className='text-lg font-medium mb-2'>Enter password</h3>
          <input
            required
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            className='bg-[#eeeeee]  mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password" placeholder='password' />
          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm '>
            Create Account
          </button>
        </form>
        <p className='text-center'>Already have a Account? <Link to='/login' className='text-blue-600'>Login here</Link></p>

      </div>
      <div>
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default UserSignUp