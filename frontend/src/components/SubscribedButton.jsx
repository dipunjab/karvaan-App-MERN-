import React from 'react'
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

const SubscribedButton = ({iSubscribed}) => {

    return (
    <button className={`flex justify-between items-center w-20 sm:w-50 md:lg:h-10 ${iSubscribed ? "bg-green-400": ""} border border-green-400 shadow shadow-green-300 rounded-full text-[10px] sm:text-[15px] font-semibold cursor-pointer hover:bg-green-300`}>
        <div>
        {
            iSubscribed ?
            <IoCheckmarkDoneCircleSharp size={20} color='green'/>:
            <IoCheckmarkDoneCircleOutline size={20} color='green'/>
        }
        </div>
        <h1 className='mr-2 text-green-950'>
            {
                iSubscribed ? 
                "Hamrah":"Be Hamrah"
            }
        </h1>
    </button>
  )
}

export default SubscribedButton
