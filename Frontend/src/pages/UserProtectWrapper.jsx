import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext';
import axios from 'axios';

const UserProtectWrapper = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true)
    const token = localStorage.getItem('token')
    console.log(token);

    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext)


    useEffect(() => {
        if (!token) {
            navigate('/login')
        }

        // now check for the validatity
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status == 200) {
                setUser(response.data.user)
               
                setIsLoading(false)

            }
        }).catch(err => {
            console.log(err)
            // remove token
            localStorage.removeItem('token')
            navigate('/login')
        })
    }, [token])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper