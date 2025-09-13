import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
    const token = localStorage.getItem('token')

    const navigate = useNavigate()

   
    axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token')
            navigate('/captain-login')
        }
    })
    
    return (
        <div>CaptainLogout</div>
    )
}

export default CaptainLogout







// logout k loye hme
//1. token lao
// 2. backend me call kro logout ko axios se
//3. if respose is positive then remove token and navigate to the login page