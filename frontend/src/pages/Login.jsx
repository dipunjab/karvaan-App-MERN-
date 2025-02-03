import React, { useEffect, useState } from 'react'
import cover from "../assets/loginBack.png"
import { FaPlaneDeparture } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {login} from "../store/authSlice"
import { useDispatch } from 'react-redux';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleRegisterbtn = () => {
        navigate("/signup")
    }

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMSG, setErrorMsg] = useState("")
    const [data, setData] = useState({
        email: "",
        password: ""
    })


    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    //Post data to backend
    const handleLogin = async() => {
        try {
            setError(false)
            setLoading(true)
            const loginData = {
                email: data.email, 
                password: data.password,
            };

            const send = await axios.post(`${import.meta.env.VITE_API_BACKEND}/users/login`, loginData)
            const postData = send.data.data
            dispatch(login({userData: postData.user, accessToken: postData.accessToken}))
            localStorage.setItem("accessToken", postData.accessToken)
            setLoading(false)
            alert("Loged In Successfully")
            navigate('/')
        } catch (error) {
            setLoading(false)
            setError(true)
            if(error.message === "Request failed with status code 404"){
                setErrorMsg("Invalid Credintials")
            }
            console.log("Error",error.message);
        } finally {
            setLoading(false)
        }
    }




    return (
        <div className='flex md:flex-row flex-col w-full h-full'>
            <div className='hidden md:block md:w-[50%] md:h-[calc(100vh)] h-[calc(50vh)]'>
                <img src={cover} alt="" className='md:h-[calc(100vh)] md:w-[80%] h-[calc(50vh)] w-full object-fill ' />
            </div>
            <div className='bg-white md:w-[50%] md:h-[calc(100vh)] h-[calc(50vh)]'>
                <h1 className='text-center mt-20 text-4xl font-semibold text-green-950'> Login</h1>
                <div className='mt-20 ml-10'>
                    <div className='flex flex-col'>
                        <label htmlFor="email" className='font-medium text-2xl'>Email</label>
                        <input type="text" placeholder='email' required  name='email'  onChange={handleDataChange} className='border-2 border-green-950 p-2 text-xs mt-3 rounded-4xl w-80' />
                    </div>
                    <div className='flex flex-col mt-5'>
                        <label htmlFor="password" className='font-medium text-xl'>Password</label>
                        <input type="text" placeholder='*********' required name='password' onChange={handleDataChange} className='border-2 border-green-950 p-2 text-xs mt-3 rounded-4xl w-80' />
                    </div>
                </div>
                {error && <p className='text-red-500 text-center mt-3'>{errorMSG}</p>}

                <div className='flex justify-center items-center gap-10 mt-15' >
                    <div onClick={handleLogin} className={`text-xl cursor-pointer font-bold hover:bg-green-300 shadow shadow-green-950 bg-green-400 p-3 rounded-full flex gap-4 justify-between items-center`}>
                        <button className='cursor-pointer' >{loading ? "Wait..":"Login"}  </button>
                        <FaPlaneDeparture />
                    </div>
                    <div className='text-xl cursor-pointer font-bold hover:bg-green-500  shadow shadow-gray-900 bg-green-700 p-3 rounded-full flex gap-4 justify-between items-center' onClick={handleRegisterbtn}>
                        <button className='cursor-pointer'>Register </button>
                        <IoIosPersonAdd />
                    </div>
                </div>
                <div className='mt-10 font-bold hover:text-green-500 text-center'>
                    <Link to="/" >Continue Without Account</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
