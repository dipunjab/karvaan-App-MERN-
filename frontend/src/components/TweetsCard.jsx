import React, { useState } from 'react';
import profileIcon from "../assets/profileIcon.jfif";

import { SlLike } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { GoPaperAirplane } from "react-icons/go";


const TweetsCard = () => {
    const [isLiked, setLiked] = useState(true)


    return (
        <div className='bg-gray-100 p-3 rounded-2xl mt-3 shadow-md'>
            {/* Head of tweet card */}
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <div className='w-8 h-8 shadow shadow-gray-500 rounded-full overflow-hidden'>
                        <img src={profileIcon} alt="profileIcon" className='w-full h-full' />
                    </div>
                    <div className='flex'>
                        <div className='ml-3'>
                            <h2 className='text-gray-600 text-sm font-medium'>Robo</h2>
                            <p className='text-gray-500 text-xs'>Subscribers: 200</p>
                        </div>
                        <h1 className='ml-5 text-sm font-extrabold text-green-700'>.Be Hamrah</h1>
                    </div>
                </div>
                <div>
                    <h2 className='text-gray-400 text-xs'>CreatedAt</h2>
                </div>
            </div>
            {/* Tweet Content */}
            <div className='text-[13px] mt-2 p-2 font-medium'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus voluptatem facilis cum saepe quis temporibus dicta, neque omnis voluptatum sed quae eius repellat itaque doloremque aliquam eveniet quos molestiae!</p>
            </div>
            {/* icons and input for remarks */}
            <div className='flex justify-between items-center'>
                <div className='flex gap-1 justify-center items-center'>
                    {
                        isLiked ?
                            <AiFillLike color='green' size={20} />
                            :
                            <SlLike color='green' className='cursor-pointer' />
                    }
                    <h2 className='text-[12px] text-green-700 font-semibold'>20</h2>
                    <div className='flex ml-5 md:ml-10 gap-1 justify-center items-center'>
                        <AiOutlineComment size={20} color='green' />
                        <h2 className='text-[12px] text-green-700 font-semibold'>20</h2>
                    </div>
                </div>
                <div className='flex justify-between items-center shadow rounded-3xl p-1 lg:p-2 bg-white'>
                    <input type="text" placeholder='Your Remarks' className='text-[14px] focus:outline-none lg:w-xs'/>
                    <GoPaperAirplane/>
                </div>
            </div>
        </div>
    );
};

export default TweetsCard;
