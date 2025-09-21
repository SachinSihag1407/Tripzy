import React from 'react'

const LookingForDriver = (props) => {
    return (

        <div>

            <h5 onClick={() => {
                props.setVehicleFound(false)
            }}
                className='p-1 text-center w-[93%] absolute top-0  '> <i className=" text-3xl text-gray-600 ri-arrow-down-wide-fill"></i></h5>

            <h3 className='text-2xl font-semibold mb-5'>Looking for a Deriver</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>

                <img className='h-20 w-20 ' src='data:image/jpeg;base64,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' alt='' />

                <div className="w-full mt-5">
                    <div className="flex items-center gap-5 p-3 border-b border-gray-300">
                        <i className="text-lg ri-map-pin-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 p-3 border-b border-gray-300">
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">95/33-B</h3>
                            <p className="text-sm -mt-1 text-gray-600">{props.destination}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 p-3">
                        <i className="text-lg ri-money-rupee-circle-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
                            <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default LookingForDriver