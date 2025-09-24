import React, { useContext, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'


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
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)


  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  // yha pr hm socket val send and recieve msg krennge
  const { user } = useContext(UserDataContext);
  const { socket } = useContext(SocketContext)

  useEffect(() => {
    if (user && user._id) {
      socket.emit("join", { userType: "user", userId: user._id });
      // console.log("join emit:", user._id);
    }
  }, [user]);

  socket.on('ride-confirmed', ride => {
    setWaitingForDriver(true)
    setVehicleFound(false)
    setRide(ride)

  })

  const handlePickupChange = async (e) => {
    const inputValue = e.target.value;
    const url = `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`;
    const userToken = localStorage.getItem("userToken");

    // console.log("Input ->", inputValue);
    // console.log("Calling URL:", url);
    // console.log("Token ->", token);

    setPickup(inputValue);

    try {
      const response = await axios.get(url, {
        params: { input: inputValue },
        headers: {
          Authorization: userToken ? `Bearer ${userToken}` : ""
        }
      });

      setPickupSuggestions(response.data);

    } catch (err) {
      console.error("❌ Error in pickup location request");
      console.error("Status:", err.response?.status);
      console.error("Headers:", err.response?.headers);
      console.error("Data:", err.response?.data);  // yahi backend ka actual error message hoga
      console.error("Message:", err.message);
    }
  };


  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
      })
      setDestinationSuggestions(response.data)

    } catch (err) {
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
    //  console.log("Token ->", localStorage.getItem("token"));
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: {
        pickup,
        destination
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })


    setFare(response.data)

  }


  async function createRide() {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }

      })

    console.log(response.data);

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
            className='text-lg text-white w-full bg-black rounded-lg mt-0 px-4 py-2'>
            Find Trip
          </button>

        </div>

        <div ref={panelRef} className=' bg-white py-5 h-0 overflow-y-auto '>
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

        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanelOpen={setVehiclePanelOpen}
        />

      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white  py-6 px-3 pt-12'>

        <ConfirmRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />

      </div>

      <div ref={vehicleFoundRef} className=' fixed w-full z-10 bottom-0 translate-y-full bg-white  py-6 px-3 pt-12'>

        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          setVehicleFound={setVehicleFound}
        />

      </div>

      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0  bg-white  py-6 px-3 pt-12'>

        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
        />

      </div>

    </div>
  )
}

export default Home