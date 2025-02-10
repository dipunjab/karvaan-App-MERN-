import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [loadingPersonal, setLoadingPersonal] = useState(false);
    const [errorPersonal, setErrorPersonal] = useState(false);
    const [errorMsgPersonal, setErrorMsgPersonal] = useState("");
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');

    const [loadingSecurity, setLoadingSecurity] = useState(false);
    const [errorSecurity, setErrorSecurity] = useState(false);
    const [errorMsgSecurity, setErrorMsgSecurity] = useState("");
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const submitPersonalData = async () => {
        try {
            setErrorPersonal(false);
            setLoadingPersonal(true);
            await axios.patch(`${import.meta.env.VITE_API_BACKEND}/users/update-accountDetails`,
                { fullname, email },
                { headers: { Authorization: localStorage.getItem('accessToken') } }
            );
        } catch (error) {
            setErrorPersonal(true);
            setErrorMsgPersonal(error.message);
        } finally {
            setLoadingPersonal(false);
            setFullname("");
            setEmail("");
        }
    };

    const changePasswordHandle = async () => {
        try {
            setErrorSecurity(false);
            setLoadingSecurity(true);
            const res = await axios.post(`${import.meta.env.VITE_API_BACKEND}/users/changePassword`,
                { oldPassword: oldPassword, newPassword: newPassword },
                { headers: { Authorization: localStorage.getItem('accessToken') } }
            );
            console.log(res)
        } catch (error) {
            setErrorSecurity(true);
            if (error.message === "Request failed with status code 400") {
                setErrorMsgSecurity("Wrong Old Password");
            }
        } finally {
            setLoadingSecurity(false);
            setOldPassword("");
            setNewPassword("");
        }
    };

    const navigate = useNavigate()
    const [showModal, setModal] = useState(false)
    const confirmDeleteModal = () => {
        setModal(true)
    }

    const deleteAccount = async()=>{
        try {
            setLoading(true);
            const res = await axios.delete(`${import.meta.env.VITE_API_BACKEND}/users/delete-account`,
                { headers: { Authorization: localStorage.getItem('accessToken') } }
            );
            console.log(res)
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
            navigate("/")
            localStorage.setItem("accessToken", "")
        }
    }

    return (
        <div className='flex flex-col justify-center items-center mt-10 px-4'>
            <div className={`shadow-lg p-6 rounded-3xl w-full max-w-lg ${loadingPersonal ? "bg-green-400 text-white" : "bg-white"}`}>
                <h1 className='font-bold text-3xl sm:text-5xl text-gray-700'>Personal</h1>
                <p>To change your Email OR Fullname.</p>
                <div className='mt-8'>
                    <div>
                        <label className='font-medium text-xl sm:text-2xl text-gray-600'>Full Name:</label>
                        <input onChange={(e) => setFullname(e.target.value)} value={fullname} type='text' required placeholder='Full Name' className='block w-full shadow p-3 mt-2 rounded-xl text-lg border border-gray-300 focus:ring focus:ring-green-300' />
                    </div>
                    <div className='mt-5'>
                        <label className='font-medium text-xl sm:text-2xl text-gray-600'>Email:</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' required placeholder='Email@gmail.com' className='block w-full shadow p-3 mt-2 rounded-xl text-lg border border-gray-300 focus:ring focus:ring-green-300' />
                    </div>
                </div>
                {errorPersonal && <p className='text-red-600'>{errorMsgPersonal}</p>}
                <button onClick={submitPersonalData} className='mt-6 w-full text-xl font-semibold border border-green-500 p-3 rounded-2xl bg-green-500 hover:bg-green-700 text-white cursor-pointer'>{loadingPersonal ? "Updating..." : "Update"}</button>
            </div>

            <div className={`shadow-lg p-6 rounded-3xl w-full max-w-lg mt-6 ${loadingSecurity ? "bg-green-400 text-white" : "bg-white"}`}>
                <h1 className='font-bold text-3xl sm:text-5xl text-gray-700'>Security</h1>
                <p className='text-gray-400 mt-3'>Change Password</p>
                <div className='mt-6'>
                    <div>
                        <label className='font-medium text-xl text-gray-600'>Old Password:</label>
                        <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type='password' placeholder='Old Password' className='block w-full shadow p-3 mt-2 rounded-xl text-lg border border-gray-300 focus:ring focus:ring-green-300' />
                    </div>
                    <div className='mt-3'>
                        <label className='font-medium text-xl text-gray-600'>New Password:</label>
                        <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type='password' placeholder='New Password' className='block w-full shadow p-3 mt-2 rounded-xl text-lg border border-gray-300 focus:ring focus:ring-green-300' />
                    </div>
                    {errorSecurity && <p className='text-red-600'>{errorMsgSecurity}</p>}
                    <button onClick={changePasswordHandle} className='mt-6 w-full text-xl font-semibold border border-green-500 p-3 rounded-2xl bg-green-500 hover:bg-green-700 text-white cursor-pointer'>{loadingSecurity ? "Securing..." : "Secure"}</button>
                </div>
            </div>

            <div className='shadow-lg p-6 rounded-3xl bg-white w-full max-w-lg mt-6'>
                <h1 className='font-bold text-3xl sm:text-5xl text-gray-700'>Delete Account</h1>
                <p className='text-gray-400 mt-3'>
                    Deleting your account is irreversible. All your data will be lost, and you won't be able to recover it.
                    Please enter your password below to confirm deletion.
                </p>
                <div className='mt-6'>
                    <button onClick={confirmDeleteModal} className='mt-6 w-full text-xl font-semibold border border-red-600 p-3 rounded-2xl bg-red-600 hover:bg-red-800 text-white cursor-pointer'>Delete Account</button>
                </div>

                {/* for delete modal */}
                {showModal && (
                    <div className='fixed inset-0 flex justify-center items-center'>
                        <div className='bg-white p-6 rounded-xl shadow-lg max-w-sm'>
                            <h2 className='text-xs sm:text-xl md:text-2xl font-bold text-gray-700'>Confirm Deletion</h2>
                            <p className='text-gray-600 mt-4 text-xs sm:text-xl'>Are you sure you want to delete your account? This action cannot be undone.</p>
                            <div className='mt-6 flex justify-end gap-4'>
                                <button onClick={() => setModal(false)} className='cursor-pointer px-4 py-2 bg-gray-300 text-gray-700 rounded-lg'>Cancel</button>
                                <button onClick={deleteAccount} className='px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-800' disabled={loading ? true: false}>{loading? "Deleting...": "Delete"}</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default Settings;
