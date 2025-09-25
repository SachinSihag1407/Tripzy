import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
    return (
        <div>
            <div className='relative bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] h-screen w-full'>

                {/* Logo top-right (responsive size) */}
                <img 
                  className='absolute top-2 right-3 w-20 h-20 sm:w-16 sm:h-16 md:w-30 md:h-30 lg:w-30 lg:h-30 bg-transparent' 
                  src="/3.png" 
                  alt='Tripzy Logo' 
                />

                {/* White box bottom (responsive padding + font) */}
                <div className='absolute bottom-0 w-full bg-white px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8'>
                    <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold'>
                        Get Started with Tripzy
                    </h2>
                    <Link 
                      to='/login'  
                      className='flex items-center justify-center w-full bg-black text-lg sm:text-xl md:text-2xl text-white py-2 sm:py-3 md:py-4 rounded-lg mt-4 sm:mt-5'
                    >
                      Continue
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Start
