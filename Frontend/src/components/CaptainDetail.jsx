import { CaptainDataContext } from "../context/CaptainContext.jsx"
import { useContext } from "react"


const CaptainDetail = () => {

    const {captain} = useContext(CaptainDataContext)

    return (
        <div>

            <div className='flex items-center justify-between'>

                <div className='flex items-center justify-start gap-3 '>
                    <img
                        className="h-10 w-10 rounded-full object-cover"
                        src="data:image/jpeg;base64,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"
                        alt="profile"
                    />
                    <h4 className='text-lg font-medium'>{captain.fullName.firstName+" "+captain.fullName.lastName}</h4>
                </div>

                <div >
                    <h4 className='text-xl font-semibold'>₹300.5</h4>
                    <p className='text-sm text-gray-600'>Earned</p>
                </div>

            </div>


            <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>

                <div className='text-center'>
                    <i className=" text-3xl mb-2 font-thin ri-timer-2-line"></i>
                    <h5 className='text-lg font-medium'>10.3</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>

                <div className='text-center'>
                    <i className=" text-3xl mb-2 font-thin ri-speed-up-line"></i>
                    <h5 className='text-lg font-medium'>10.3</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>

                <div className='text-center'>
                    <i className=" text-3xl mb-2 font-thin ri-booklet-line"></i>
                    <h5 className='text-lg font-medium'>10.3</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>

            </div>

        </div>
    )
}

export default CaptainDetail