import React from 'react'
import robot from "../assets/robot.jfif"

const PlaylistCard = () => {
  return (
    <div className='mt-6 mr-4 shadow rounded-2xl border-3 border-green-100  hover:border-green-200  hover:bg-green-100 cursor-pointer border-double p-1 shadow-emerald-100'>
        <img src={robot} alt="" className='h-40 w-full rounded-2xl'/>
        <div className='ml-2 mt-2 mb-1'>
            <h2 className='font-mono font-semibold'>Liked Videos</h2>
            <p className='text-[12px] mr-1 font-light mb-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat obcaecati illum perspiciatis totam at. Nobis?</p>
            <p className='font-extralight text-gray-400 text-[12px]'>Total Videos: <span>13</span></p>
        </div>
    </div>
  )
}

export default PlaylistCard
