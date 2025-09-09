import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
                <img className='w-16 ml-8' src="https://imgs.search.brave.com/xPdmAEXeT0QDl2R-1VmW-llSt2wVGDLAFUeRbQ01Goc/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly93d3cu/ZWRpZ2l0YWxhZ2Vu/Y3kuY29tLmF1L3dw/LWNvbnRlbnQvdXBs/b2Fkcy9uZXctVWJl/ci1sb2dvLXdoaXRl/LXBuZy1tZWRpdW0t/c2l6ZS5wbmc" alt='' />
                <div className='bg-white pb-7 py-4 px-4'>
                    <h2 className='text-3xl font-bold'> Get Started with Tripzy</h2>
                    <Link to='/login'  className=' flex items-center justify-center w-full bg-black text-xl text-white py-3 rounded mt-5'>Continue</Link>
                </div>
            </div>
        </div>
    )
}

export default Home