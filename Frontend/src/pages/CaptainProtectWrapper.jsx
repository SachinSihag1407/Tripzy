import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainProtectWrapper = ({ children }) => {

    const captainToken = localStorage.getItem('captainToken')
    const navigate = useNavigate()
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!captainToken) {
            // to vapis navigate kr ddo captain-login
            navigate('/captain-login')
        }

        // now send the req to the backend yha se hm req kr rhe h authenrication k liye
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${captainToken}`
            }
        }).then((response) => {
            if (response.status == 200) {
                setCaptain(response.data.captain)
                // now navigate to the captain login

                setIsLoading(false)
            }
        }).catch(err => {
            //to token ko remove kro
            console.log(err)
            localStorage.removeItem('captainToken')
            navigate('/captai-login')
        })

    }, [captainToken])

    // jb tk user validate ho tb tk load ho ja
    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>{children}</div>
    )
}

export default CaptainProtectWrapper