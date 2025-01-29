import React, { useState } from 'react'
import { SlLike } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";

const CommentCard = ({ username, userpfp, content, createdAt, like }) => {
        const [isLiked, setLiked] = useState(false)
    
    return (
        <div className='bg-white p-2 rounded-2xl mt-3'>
            <div className='flex justify-between gap-4'>
                <div className='flex gap-4'>
                    <div className='w-8 h-8 shadow shadow-gray-500 rounded-full overflow-hidden'>
                        <img src={userpfp} alt="profileIcon" className='w-full h-full' />
                    </div>
                    <h1 className='font-light text-[15px]'>{username || "username"}</h1>
                </div>
                <h2 className='font-light text-[15px]'>{createdAt || "createdAt"}</h2>
            </div>
            <hr className='mt-2 mb-2 text-gray-300' />
            <div className='bg-gray-200 p-2 rounded-3xl'>
                <p className='font-light text-[15px]'>{content || "nice video"}</p>
            </div>
            <div className='flex justify-end mt-2 gap-2 mr-3'>

                {
                    isLiked ?
                        <AiFillLike color='green' size={15} className='cursor-pointer' />
                        :
                        <SlLike color='green' className='cursor-pointer' size={15} />
                }
                <h2 className='text-[8px] text-green-700 font-semibold'>20</h2>
            </div>
        </div>
    )
}

export default CommentCard
