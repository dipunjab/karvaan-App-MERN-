import React from 'react'
import robot from "../assets/robot.jfif"
import { useNavigate } from 'react-router-dom'

const PlaylistCard = ({_id,name, description, videos}) => {

  const navigate = useNavigate()

  const playlistFullPage = ()=>{
    navigate(`/fullplaylist/${_id}`)
  }

  return (
    <div className='mt-6 mr-4 shadow rounded-2xl border-3 border-green-100  hover:border-green-200  hover:bg-green-100 cursor-pointer border-double p-1 shadow-emerald-100' onClick={playlistFullPage}>
            <h2 className='text-3xl font-mono font-semibold h-20 w-full rounded-2xl text-center'>{name}</h2>
            <div className='ml-2 mt-2 mb-1'>
            <p className='text-[12px] mr-1 font-light mb-1'>{description}</p>
            <p className='font-extralight text-gray-400 text-[12px]'>Total Videos: <span>{videos.length}</span></p>
        </div>
    </div>
  )
}

export default PlaylistCard
