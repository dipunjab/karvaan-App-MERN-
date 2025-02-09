import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cover from "../assets/loginBack.png";
import { FaPlaneDeparture } from "react-icons/fa";
import lodainggif from "../assets/Loading.gif"

const Signup = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMSG, setErrorMSG] = useState(null);

    const [profileImage, setPImage] = useState(null);
    const [coverImage, setCImage] = useState(null);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Handle profile image upload
    const handleImageChange = (e) => {
        setPImage(e.target.files[0]);
    };

    // Handle cover image upload
    const handleCoverImageChange = (e) => {
        setCImage(e.target.files[0]);
    };

    //check for userExistance with username
    useEffect(() => {
        if (username) {

            ; (
                async () => {
                    setError(false)
                    try {
                        const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/users/userbyusername/${username}`);
                        setError(true);
                        setErrorMSG("This username is already taken. Please choose another one.");
                    } catch (error) {
                        return false;
                    }
                }
            )()
        }
    }, [username])

    // Register Handler Function
    const handleRegister = async () => {
        if (!fullname || !email || !username || !password || !profileImage || !coverImage) {
            setError(true);
            setErrorMSG("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append('fullname', fullname);
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('avatar', profileImage);
        formData.append('coverImage', coverImage);

        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_API_BACKEND}/users/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error.response.data);
            setError(true);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='flex md:flex-row flex-col w-full h-full'>
            <div className='hidden md:block md:w-[50%] md:h-[calc(100vh)] h-[calc(50vh)]'>
                <img src={cover} alt="Cover" className='md:h-[calc(100vh)] md:w-[80%] h-[calc(50vh)] w-full object-fill' />
            </div>

            <div className='bg-white md:w-[50%] md:h-[calc(100vh)] h-[calc(50vh)]'>
                <h1 className='text-center mt-10 text-4xl font-semibold text-green-950'>Signup</h1>

                <div className='flex justify-center  flex-col md:flex-row items-center gap-10 mt-5'>
                    <div className='flex flex-col items-center gap-2'>
                        <label htmlFor="avatar" className='font-medium text-[12px] md:text-xs'>Profile Picture</label>
                        {!profileImage ? (
                            <input type="file" accept='image/*' name='avatar' onChange={handleImageChange} />
                        ) : (
                            <div className='flex items-center gap-2'>
                                <img src={URL.createObjectURL(profileImage)} className='w-10 h-10 rounded-full' alt="Profile Preview" />
                                <button onClick={() => setPImage(null)}>❌</button>
                            </div>
                        )}
                    </div>

                    <div className='flex flex-col items-center gap-2'>
                        <label htmlFor="coverImage" className='font-medium text-[12px] md:text-xs'>Cover Image</label>
                        {!coverImage ? (
                            <input type="file" accept="image/*" name='coverImage' onChange={handleCoverImageChange} />
                        ) : (
                            <div className='flex items-center gap-2'>
                                <img src={URL.createObjectURL(coverImage)} className='w-20 h-10 rounded' alt="Cover Preview" />
                                <button onClick={() => setCImage(null)}>❌</button>
                            </div>
                        )}
                    </div>
                </div>

                <div className='ml-10 mt-5'>
                    <div className='flex flex-col mb-3'>
                        <label htmlFor="fullname" className='font-medium text-xl'>Fullname</label>
                        <input type="text" placeholder='Fullname' value={fullname} onChange={(e) => setFullname(e.target.value)} className='border-2 border-green-950 p-2 text-xs mt-3 rounded-4xl w-80' />
                    </div>

                    <div className='flex flex-col mb-3'>
                        <label htmlFor="username" className='font-medium text-xl'>Username</label>
                        <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className='border-2 border-green-950 p-2 text-xs mt-3 rounded-4xl w-80' />
                    </div>

                    <div className='flex flex-col mb-3'>
                        <label htmlFor="email" className='font-medium text-xl'>Email</label>
                        <input type="email" placeholder='email@karvaan.com' value={email} onChange={(e) => setEmail(e.target.value)} className='border-2 border-green-950 p-2 text-xs mt-3 rounded-4xl w-80' />
                    </div>

                    <div className='flex flex-col mt-5'>
                        <label htmlFor="password" className='font-medium text-xl'>Password</label>
                        <input type="text" placeholder='*********' value={password} onChange={(e) => setPassword(e.target.value)} className='border-2 border-green-950 p-2 text-xs mt-3 rounded-4xl w-80' />
                    </div>
                </div>

                {error && <p className='text-red-500 text-center mt-3'>{errorMSG}</p>}

                <div className='flex justify-center items-center gap-10 mt-5'>
                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className='text-xl cursor-pointer font-bold hover:bg-green-300 shadow bg-green-400 p-3 rounded-full flex gap-4 items-center'>
                        {loading ? "Registering..." : "Register"}
                        <FaPlaneDeparture />
                    </button>

                    <div className='text-xs cursor-pointer font-bold hover:text-green-600' onClick={() => navigate("/login")}>
                        Already Have Account?
                    </div>
                </div>
            </div>
            {loading && (
                <div className='fixed top-[50%] left-[50%]'>
                <img src={lodainggif} className='md:w-40 w-20'/>
            </div>
            )}
        </div>
    );
};

export default Signup;
