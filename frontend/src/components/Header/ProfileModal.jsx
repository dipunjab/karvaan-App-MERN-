import React from 'react'
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {logout} from "../../store/authSlice"

const ProfileModal = () => {
    const currentUser = useSelector((state) => state.auth.userData);
    const curUserId = currentUser?.userData?.data._id

    const dispatch = useDispatch()

    const handleLogout = () =>{
        dispatch(logout())
        localStorage.setItem("accessToken", "")
    }

    return (
        <div className='w-45 border-2 rounded-2xl p-2 bg-green-100 border-green-100 shadow shadow-green-300'>
            <div>
                <Link to={`/profile/${curUserId}`} className="p-1 rounded-4xl flex justify-between items-center hover:bg-green-200">
                    <h2 to={`/profile/${curUserId}`} className='text-[14px] font-semibold'>Profile</h2>
                    <CgProfile />
                </Link>
            </div>
            <div onClick={handleLogout} className='p-1 rounded-4xl flex justify-between items-center hover:bg-green-200'>
                <h2 className='text-[14px] font-semibold'>LogOut</h2>
                <IoMdLogOut />
            </div>
        </div>
    )
}

export default ProfileModal
