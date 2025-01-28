import React from 'react'
import robot from "../assets/robot.jfif"
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const YourVideosCard = () => {
    return (
        <div className='mt-4 shadow drop-shadow-sm shadow-green-500 flex p-2  bg-green-100 rounded-2xl'>
            <div className='w-26 h-26 rounded-2xl'>
                <img src={robot} alt="" className='rounded-2xl' />
            </div>
            <div className='ml-3'>
                <h1 className='font-extrabold'>Title: <span className='font-light'>Robotoic</span></h1>
                <h1 className='font-extrabold'>Description: <span className='font-light text-[12px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae totam molestiae, explicabo blanditiis repellendus vel ducimus earum eum commodi a quos repudiandae, ea rem vero ab, voluptatem labore. Magni, quibusdam.</span></h1>
                <div className='flex gap-10'>
                    <h1 className='font-bold text-[12px]'>Created At: <span className='font-light'>23-12-2017</span></h1>
                    <h1 className='font-bold text-[12px]'>Views: <span className='font-light'>23</span></h1>
                </div>
            </div>
            <div className='border-l-2 border-l-gray-50 ml-1'>
                <div className='flex flex-col ml-3 gap-7'>
                <MdAutoDelete size={30} color='green'/>
                <FaEdit size={30} color='green'/>
                </div>
            </div>
        </div>
    )
}

export default YourVideosCard
