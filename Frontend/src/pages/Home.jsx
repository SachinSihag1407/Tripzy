import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})


  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }

      })
      setPickupSuggestions(response.data)

    } catch (err) {
      console.log("Error in pickup location :", err.message);

    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data)

    } catch {
      console.log("Error in pickup location :", err.message);

    }
  }


  const submitHandler = (e) => {

    e.preventDefault();

  }

  useGSAP(function () {

    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24

      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    }

    else {
      gsap.to(panelRef.current, {
        height: '0%',

      })

      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })

    } else {

      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [vehiclePanelOpen])


  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })

    } else {

      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [confirmRidePanel])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })

    } else {

      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [vehicleFound])

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })

    } else {

      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [waitingForDriver])


  async function findTrip() {
    setPanelOpen(false);
    setVehiclePanelOpen(true)
    const reponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Brear ${localStorage.getItem('token')}`
      }
    })

  }


  return (
    <div className='h-screen relative overflow-hidden'>

      <img className='w-16 absolute left-5 top-5' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='' />

      <div onClick={() => {
        setVehiclePanelOpen(false)
      }}
        className='h-screen w-screen '>
        <img className='h-full w-full object-cover' src='https://imgs.search.brave.com/d0X_YC5CTyk2e7Z2I4gVmfhZ5OBQ7iXVkKPJLoa8XqM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9naXRo/dWIuY29tL01pbmRv/cmtzT3BlblNvdXJj/ZS9VYmVyLUNhci1B/bmltYXRpb24tQW5k/cm9pZC9yYXcvbWFz/dGVyL2Fzc2V0cy9o/b3ctdG8tYWRkLXVi/ZXItY2FyLWFuaW1h/dGlvbi1pbi1hbmRy/b2lkLWFwcC1naWYu/Z2lm.gif' alt='' />

      </div>

      <div className=' flex flex-col justify-end absolute h-screen top-0 w-full'>

        <div className='h-[30%] p-6 bg-white relative '>

          <h5 ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false)
            }}
            className='absolute right-6 top-6 text-2xl opacity-0'>
            <i className="ri-arrow-down-wide-fill"></i> </h5>

          <h4 className='text-2xl font-semibold'>Find a trip</h4>

          <form className='relative py-3' onSubmit={(e) => {
            submitHandler(e)
          }} >

            <div className='line absolute h-17 w-1 top-[35%] left-6 bg-gray-900 rounded-full'></div>

            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('pickup')
              }}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5 '
              type='text'
              placeholder='Add a pick-up location'
            />

            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3 '
              type='text'
              placeholder='Enter your destination'
            />

          </form>

          <button
            onClick={findTrip}
            className='flex items-cen text-whiteter w-full bg-black rounded-lg mt-3 px-4 py-2'>
            Find Trip
          </button>

        </div>

        <div ref={panelRef} className=' bg-white h-0'>
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>

      </div>

      <div ref={vehiclePanelRef} className='fixed  w-full z-10 bottom-0 translate-y-full bg-white  py-10 px-3 pt-12'>

        <VehiclePanel fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} />

      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white  py-6 px-3 pt-12'>

        <ConfirmRide set setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />

      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white  py-6 px-3 pt-12'>

        <LookingForDriver setVehicleFound={setVehicleFound} />

      </div>

      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0  bg-white  py-6 px-3 pt-12'>

        <WaitingForDriver waitingForDriver={waitingForDriver} />

      </div>

    </div>
  )
}

export default Home