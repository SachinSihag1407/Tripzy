import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext.jsx';
import axios from 'axios';

const UserProtectWrapper = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true)
    const userToken = localStorage.getItem('userToken')
   

    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext)


    useEffect(() => {
        if (!userToken) {
            navigate('/login')
        }

        // now check for the validatity
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }).then((response) => {
            if (response.status == 200) {

                // yha only hme response ka data bejhna h n ki data me  only user
                setUser(response.data)
               
                setIsLoading(false)

            }
        }).catch(err => {
            console.log(err)
            // remove token
            localStorage.removeItem('userToken')
            navigate('/login')
        })
    }, [userToken])

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