import React from 'react'
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";


const ProfileModal = () => {
    return (
        <div className='w-45 border-2 rounded-2xl p-2 bg-green-100 border-green-100 shadow shadow-green-300'>
            <div className='p-1 rounded-4xl flex justify-between items-center hover:bg-green-200'>
                <h2 className='text-[14px] font-semibold'>Profile</h2>
                <CgProfile />
            </div>
            <div className='p-1 rounded-4xl flex justify-between items-center hover:bg-green-200'>
                <h2 className='text-[14px] font-semibold'>LogOut</h2>
                <IoMdLogOut />
            </div>
        </div>
    )
}

export default ProfileModal
