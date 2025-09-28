import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = (props) => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)

    const finishRidePanelRef = useRef(null)
    const location = useLocation();
    const rideData = location.state?.ride;

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])

    return (

        <div className='h-screen relative flex flex-col justify-end'>

            <div className='fixed p-6 top-0 flex items-center justify-end w-screen'>
                <Link to='/captain-home' className='h-10  w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className=" text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            {/* <div className='h-4/5'>
                <img className='h-full w-full object-cover' src='https://imgs.search.brave.com/d0X_YC5CTyk2e7Z2I4gVmfhZ5OBQ7iXVkKPJLoa8XqM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9naXRo/dWIuY29tL01pbmRv/cmtzT3BlblNvdXJj/ZS9VYmVyLUNhci1B/bmltYXRpb24tQW5k/cm9pZC9yYXcvbWFz/dGVyL2Fzc2V0cy9o/b3ctdG8tYWRkLXVi/ZXItY2FyLWFuaW1h/dGlvbi1pbi1hbmRy/b2lkLWFwcC1naWYu/Z2lm.gif' alt='' />
            </div> */}

            <div className='h-1/5 p-4 flex items-center justify-between bg-yellow-400 relative'
                onClick={() => {
                    setFinishRidePanel(true)
                }}
            >
                <h5
                    className='p-1 text-center w-[95%] absolute top-0  '>
                    <i className=" text-3xl text-gray-600 ri-arrow-up-wide-fill"></i>
                </h5>

                <h4 className='text-xl font-semibold'>4 KM away</h4>
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>
                    Complete Ride
                </button>
            </div>

            <div ref={finishRidePanelRef} className='fixed  w-full z-[500] bottom-0 translate-y-full  bg-white  py-10 px-3 pt-12'>
                <FinishRide
                    ride={rideData}
                    setFinishRidePanel={setFinishRidePanel}
                />
            </div>

            <div className='h-screen fixed w-screen bottom-0 z-[-1] '>
                <LiveTracking />
            </div>
        </div>
    )
}

export default CaptainRiding
