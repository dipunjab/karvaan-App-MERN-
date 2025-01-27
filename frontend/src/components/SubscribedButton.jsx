import React from 'react'
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

const SubscribedButton = ({iSubscribed=false}) => {

    return (
    <button className={`flex justify-between items-center w-30 md:w-50 md:lg:h-10 ${iSubscribed ? "bg-green-400": ""} border border-green-400 shadow shadow-green-300 rounded-full text-[15px] font-semibold`}>
        <div>
        {
            iSubscribed ?
            <IoCheckmarkDoneCircleSharp size={30} color='green'/>:
            <IoCheckmarkDoneCircleOutline size={30} color='green'/>
        }
        </div>
        <h1 className='mr-2 text-green-950'>
            Hamrah
        </h1>
    </button>
  )
}

export default SubscribedButton
