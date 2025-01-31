import React from 'react'
import profileIcon from "../assets/profileIcon.jfif"
import robot from "../assets/robot.jfif"
import SubscribedButton from './SubscribedButton'


const ChannelCard = () => {
    return (
        <div className='mt-4 p-2 bg-white shadow drop-shadow-sm shadow-green-100 rounded-full flex justify-between items-center'>
            <div className='flex justify-start items-center'>
                <div className='w-20 h-20 md:w-30 md:h-30 rounded-full'>
                    <img src={robot} alt="" className='rounded-full' />
                </div>
                <div className='ml-2 text-start'>
                    <h2 className='text-[20px] font-semibold'>Usman ghani</h2>
                    <p className='text-[12px] font-medium text-gray-500'>@usmanghani</p>
                    <p className='text-[10px] font-light text-gray-400'>Subscribers: 200</p>
                    <p className='text-[12px] font-semibold text-gray-400'>descriptions</p>
                </div>
            </div>
            <SubscribedButton/>
        </div>
    )
}

export default ChannelCard
