import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cover from "../assets/loginBack.png"
import { FaPlaneDeparture } from "react-icons/fa";


const Signup = () => {
    const navigate = useNavigate()

    const handleRegisterbtn = () => {
        navigate("/login")
    }
    const [profileImage, setPImage] = useState(null);
    const [coverImage, setCImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='flex md:flex-row flex-col w-full h-full'>
            <div className='hidden md:block md:w-[50%] md:h-[calc(100vh)] h-[calc(50vh)]'>
                <img src={cover} alt="" className='md:h-[calc(100vh)] md:w-[80%] h-[calc(50vh)] w-full object-fill ' />
            </div>
            <div className='bg-white md:w-[50%] md:h-[calc(100vh)] h-[calc(50vh)]'>
                <h1 className='text-center mt-10 text-4xl font-semibold text-green-950'> Signup</h1>
                <div className='flex justify-center items-center gap-10'>
                    <div className='flex justify-center items-center mt-3 gap-5'>
                        <label htmlFor="pfp" className='font-medium text-xs'>Profile Picture</label>
                        {!profileImage ?
                            <input type="file" accept='image/*' className='border-2 border-green-950 text-xs mt-3 rounded-4xl w-10 h-10' onChange={handleImageChange} />
                            :
                            (
                                <>
                                    <img src={profileImage} className='w-10 h-10' />
                                    <h1 onClick={() => setPImage(null)} className='cursor-pointer'>❌</h1>
                                </>
                            )}


                    </div>
                    <div className='flex justify-center items-center mt-1 gap-2'>
                        <label htmlFor="pfp" className='font-medium text-xs'>CoverImage</label>
                        {!coverImage ?
                            <input type="file" accept="image/*" className='border-2 border-green-950 text-xs mt-3 rounded-2xl w-30 h-10' onChange={handleCoverImageChange} />
                            :
                            (
                                <>
                                    <img src={coverImage} className='w-30 h-10' />
                                    <h1 onClick={() => setCImage(null)} className='cursor-pointer'>❌</h1>
                                </>
                            )}
                    </div>
                </div>
                <div className='ml-10'>
                    <div className='flex flex-col mb-3'>
                        <label htmlFor="fullname" className='font-medium text-xl'>Fullname</label>
                        <input type="text" placeholder='Fullname' className='border-2 border-green-950 p-2 text-xs mt-3 rounded-4xl w-80' />
                    </div>
                    <div className='flex flex-col mb-3'>
                        <label htmlFor="username" className='font-medium text-xl'>Username</label>
                        <input type="text" placeholder='Username' className='border-2 border-green-950 p-2 text-xs mt-3 rounded-4xl w-80' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="email" className='font-medium text-xl'>Email</label>
                        <input type="text" placeholder='email@karvaan.com' className='border-2 border-green-950 p-2 text-xs mt-3 rounded-4xl w-80' />
                    </div>
                    <div className='flex flex-col mt-5'>
                        <label htmlFor="password" className='font-medium text-xl'>Password</label>
                        <input type="text" placeholder='*********' className='border-2 border-green-950 p-2 text-xs mt-3 rounded-4xl w-80' />
                    </div>
                </div>
                <div className='flex justify-center items-center gap-10 mt-15'>
                    <div className='text-xl cursor-pointer font-bold hover:bg-green-300 shadow shadow-green-950 bg-green-400 p-3 rounded-full flex gap-4 justify-between items-center'>
                        <button className='cursor-pointer'>Register </button>
                        <FaPlaneDeparture />
                    </div>
                    <div className='text-xs cursor-pointer font-bold hover:text-green-600' onClick={handleRegisterbtn}>
                        <p className='cursor-pointer'>Already Have Account? </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup
