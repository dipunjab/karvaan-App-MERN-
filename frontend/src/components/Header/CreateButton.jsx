import React from 'react'
import { FiUpload } from "react-icons/fi";

import { useSelector } from 'react-redux';

const CreateButton = () => {
    const isAuthenticated = useSelector((state) => state.auth.status)

    return (
        <div className='flex cursor-pointer gap-2 border-2 shadow shadow-gray-200 border-gray-300 p-2 rounded-4xl'>
            {
                isAuthenticated ?
                    (
                        <div className='cursor-pointer'>
                            <h2 className='text-gray-400 font-palanquin sm:block hidden'>Create</h2>
                            <FiUpload size={20} color='gray' />
                        </div>
                    ): 
                    <p className='text-wrap text-[6px] sm:text-[14px] font-light'>Join Us To Create</p>
        }

        </div>
    )
}

export default CreateButton