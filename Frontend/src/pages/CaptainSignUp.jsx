import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainSignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const navigate = useNavigate()

  const { captain, setCaptain } = useContext(CaptainDataContext)


  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullName: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicleType: vehicleType

      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
  console.log(response);
    if (response.status == 201) {
      const data = response.data;
      setCaptain(data.captain)
      localStorage.setItem('captainToken', data.captainToken)
      navigate('/captain-home')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

  }

  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20  mb-3' src="/2.png" alt='Uber logo' />

        <form onSubmit={(e) => { submitHandler(e) }}>

          <h3 className='text-lg font-medium mb-2'>What's our Captain's name</h3>

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


          <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
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

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>

          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>

          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm '>
            Create Captain Account
          </button>

        </form>

        <p className='text-center'>Already have a Account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>

      </div>

      <div>
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>

    </div>
  )
}

export default CaptainSignUp