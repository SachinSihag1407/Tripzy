import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanelOpen, setPanelOpen, setPickup, setDestination, activeField }) => {
    //sample aray for location

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        }
        else if (activeField === 'destination') {
            setDestination(suggestion)
        }
    }

    return (
        <div>

            {
                suggestions.map(function (elem, idx) {
                    <div
                        key={idx}
                        onClick={() => {
                            handleSuggestionClick(elem)
                        }}
                        className='flex gap-4 active:border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start '>
                        <h2 className='bg-[#eee] flex items-center justify-center h-8 w-12 rounded-dull'><i className="ri-map-pin-line"></i></h2>
                        <h4 className='font-medium'> {elem}</h4>
                    </div>
                })
            }

        </div>
    )
}

export default LocationSearchPanel