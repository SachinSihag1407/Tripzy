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
    <div className="h-screen relative flex flex-col justify-end">
      {/* Top Logout Button */}
      <div className="fixed p-6 top-0 flex items-center justify-end w-screen z-20">
        <Link
          to="/captain-home"
          className="h-10  w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className=" text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* MAP as background */}
      <div className="h-screen fixed w-screen bottom-0 z-0 pointer-events-auto">
        <LiveTracking />
      </div>

      {/* Finish Ride Popup */}
      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-30 bottom-0 translate-y-full bg-white py-10 px-3 pt-12"
      >
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>

      {/* Bottom Panel */}
      <div className="relative z-20">
        <div className="h-1/5 bg-yellow-400 relative flex flex-col items-center justify-center pointer-events-none">
          {/* Up Arrow Icon */}
          <h5 className="p-1 text-center w-[95%] absolute top-0">
            <i className=" text-3xl text-gray-600 ri-arrow-up-wide-fill"></i>
          </h5>

          {/* Distance Text */}
          <h4 className="text-xl font-semibold pointer-events-auto">4 KM away</h4>

          {/* Button Clickable */}
          <button
            className="w-full mt-5 bg-green-600 text-white font-semibold p-3 px-10 rounded-lg pointer-events-auto"
            onClick={() => setFinishRidePanel(true)}
          >
            Complete Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaptainRiding;
