import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})
    const [showPassword, setShowPassword] = useState(false)

    const { user, setUser } = useContext(UserDataContext)

    const navigate = useNavigate()

    const submitHandler = async (e) => {

        e.preventDefault();
        // submit krne k bad ye empty ho jayega

        const userData = {
            email,
            password
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/users/login`,
                userData
            );

            if (response.status === 200) {
                const data = response.data;
                setUser(data.user);
                localStorage.setItem('userToken', data.userToken);
                navigate('/home');
            }
        } catch (err) {
            console.error(err); // error दिखेगा
        }

        setEmail('')
        setPassword('')
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-20  mb-3' src="/3.png" alt='Uber logo' />

                <form onSubmit={(e) => { submitHandler(e) }}>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        className='bg-[#eeeeee]  mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="email" placeholder='email@example.com' />

                    <h3 className='text-lg font-medium mb-2'>Enter password</h3>
                    <div className="relative mb-7">
                        <input
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base pr-10'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='password'
                        />
                        {/* 👁 single black eye icon */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            {showPassword ? <EyeOff color="gray" size={20} /> : <Eye color="black" size={20} />}

                        </button>
                    </div>

                    <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base '>
                        Login
                    </button>
                </form>
                <p className='text-center'>New Here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>

            </div>
            <div>
                <Link to='/captain-login'
                    className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base '>Sign in as a Captain</Link>
            </div>
        </div>
    )
}

export default UserLogin