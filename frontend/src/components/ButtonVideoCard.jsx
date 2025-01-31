import React from 'react'
import { IoIosRemoveCircle } from "react-icons/io";

const ButtonVideoCard = ({title, thumbnail, username, userpfp, createdAt, views}) => {
    return (
        <div className='relative mr-4'>
            <div className="flex flex-col mt-4 rounded-2xl w-full hover:shadow hover:shadow-gray-300 cursor-pointer">
                <div className='w-full'>
                    <img src={thumbnail} alt="" className='h-48 w-full rounded-2xl' />
                </div>
                <div className='ml-2 mb-2 mt-2'>
                    <h1 className='font-montserrat text-[16px] font-bold'>{title}</h1>
                </div>
                <div className='ml-1 flex gap-24'>
                    <div className='flex w-10 h-10 mb-2 shadow shadow-gray-500 rounded-[50px]'>
                        <img src={userpfp} alt="profileIcon" className='rounded-[50px]' />
                        <h2 className='ml-2 mt-2 font-extralight text-[14px] text-gray-400'>{username}</h2>
                    </div>
                    <div className='text-[12px] text-gray-500'>
                        <p>Views: {views}</p>
                        <p>{createdAt}</p>
                    </div>
                </div>
            <button className='absolute z-1 top-0 left-[90%] cursor-pointer'><IoIosRemoveCircle size={40} color='#4CBB17'/></button>
            </div>
        </div>
    )
}

export default ButtonVideoCard
