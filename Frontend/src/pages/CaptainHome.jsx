import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetail from '../components/CaptainDetail'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from "axios";
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'



const CaptainHome = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const [ride, setRide] = useState(null)

  const ridePopUpPanelRef = useRef(null)
  const confirmRidePopUpPanelRef = useRef(null)

  const { captain } = useContext(CaptainDataContext)
  const { socket } = useContext(SocketContext)

  useEffect(() => {

    if (!captain || !socket) return;

    socket.emit("join",
      {
        userType: 'captain',
        userId: captain._id
      })

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    };

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation();
    // ye hm 10 sec me captian ki location ko update krega
  }, [])

  socket.on("new-ride", (data) => {
    console.log("🚖 New ride received:", data);
    setRide(data);
    setRidePopUpPanel(true);
  });


  async function confirmRide() {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id,

    }, {

      headers: {
        Authorization: `Bearer ${localStorage.getItem('captainToken')}`
      }

    })

    setRidePopUpPanel(false)
    setConfirmRidePopUpPanel(true)
  }


  useGSAP(function () {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })

    } else {

      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [ridePopUpPanel])


  useGSAP(function () {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })

    } else {

      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [confirmRidePopUpPanel])


  return (

    <div className='h-screen'>

      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-15 h-15 bg-transparent object-cover' src='/2.png' about='alt' />
        <Link to='/home' className='h-10  w-10 bg-white flex items-center justify-center rounded-full'>
          <i className=" text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src='https://imgs.search.brave.com/d0X_YC5CTyk2e7Z2I4gVmfhZ5OBQ7iXVkKPJLoa8XqM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9naXRo/dWIuY29tL01pbmRv/cmtzT3BlblNvdXJj/ZS9VYmVyLUNhci1B/bmltYXRpb24tQW5k/cm9pZC9yYXcvbWFz/dGVyL2Fzc2V0cy9o/b3ctdG8tYWRkLXVi/ZXItY2FyLWFuaW1h/dGlvbi1pbi1hbmRy/b2lkLWFwcC1naWYu/Z2lm.gif' alt='' />
      </div>

      <div className='h-2/5 p-6'>
        <CaptainDetail />
      </div>

      <div ref={ridePopUpPanelRef} className='fixed  w-full z-10 bottom-0   bg-white  py-10 px-3 pt-12'>

        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide}
        />


      </div>

      <div ref={confirmRidePopUpPanelRef} className='fixed h-screen w-full z-10 bottom-0 translate-y-full  bg-white  py-10 px-3 pt-12'>
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />

      </div>

    </div>
  )
}

export default CaptainHome