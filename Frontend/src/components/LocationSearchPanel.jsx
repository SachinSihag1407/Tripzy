import React from 'react'

const LocationSearchPanel = (props) => {
    //sample aray for location
    const locations = [
        "24B, Near Sachu's House, Peepal ka bass",
        "22V, Near dk's House, Peepal ka bass",
        "23R, Near jangra's House, Peepal ka bass",
        "20E, Near anil's House, Peepal ka bass",
        "21Z, Near kuta's House, Peepal ka bass",
        "27A, Near sharma's House, Peepal ka bass"
    ]
    return (
        <div>

            {locations.map(function (location, idx) {
                return <div key={idx} onClick={() => {
                    props.setVehiclePanelOpen(true)
                    props.setPanelOpen(false)
                }} className='flex gap-4 active:border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start '>
                    <h2 className='bg-[#eee] flex items-center justify-center h-8 w-12 rounded-dull'><i className="ri-map-pin-line"></i></h2>
                    <h4 className='font-medium'> {location}</h4>
                </div>
            })}



        </div>
    )
}

export default LocationSearchPanel