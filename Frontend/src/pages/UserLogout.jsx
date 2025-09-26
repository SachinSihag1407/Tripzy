import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const userToken = localStorage.getItem('userToken')
    const navigate = useNavigate()

     axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
        
    }).then((Response) => {
        if (Response.status == 200) {
            localStorage.removeItem('userToken')
            navigate('/login')
        }
    })

    // .catch((error) => {
    //     console.error("Logout error:", error.response?.data || error.message)
    //     // Agar 401 aata hai to bhi token hata ke login bhej do
    //     if (error.response?.status === 401) {
    //         localStorage.removeItem('token')
    //         navigate('/login')
    //     }
    // })

    return (
        <div>UserLogout</div>
    )
}

export default UserLogout