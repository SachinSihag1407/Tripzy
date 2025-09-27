import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LiveTracking from '../components/LiveTracking';

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);

  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: 'translateY(0)'
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: 'translateY(100%)'
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen flex flex-col relative">
      {/* Top Logout Button */}
      <div className="absolute p-6 top-0 right-0 flex items-center justify-end w-screen z-20">
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className=" text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Map Area 3/4 */}
      <div className="flex-[3]">
        <LiveTracking />
      </div>

      {/* Yellow Panel 1/4 */}
      <div className="flex-[1] bg-yellow-400 relative flex flex-col items-center justify-center">
        {/* Up Arrow Icon */}
        <h5 className="p-1 text-center w-[95%] absolute top-0">
          <i className=" text-3xl text-gray-600 ri-arrow-up-wide-fill"></i>
        </h5>

        {/* Distance Text */}
        <h4 className="text-xl font-semibold">4 KM away</h4>

        {/* Complete Ride Button */}
        <button
          className="w-[90%] mt-5 bg-green-600 text-white font-semibold p-3 px-10 rounded-lg"
          onClick={() => setFinishRidePanel(true)}
        >
          Complete Ride
        </button>
      </div>

      {/* Finish Ride Popup */}
      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-30 bottom-0 translate-y-full bg-white py-10 px-3 pt-12"
      >
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
