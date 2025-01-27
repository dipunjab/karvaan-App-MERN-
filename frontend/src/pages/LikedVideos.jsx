import React from 'react'
import LikedVideoCard from '../components/LikedVideoCard'

const LikedVideos = () => {
  return (
    <div>
      <h1 className='ml-8 sm:ml-2 text-4xl text-gray-900 font-bold'>Liked Videos <span className='text-2xl font-medium text-gray-300'> <span className='text-4xl'>.</span> (200)</span></h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 mt-6 ml-8 sm:ml-2'>
        <LikedVideoCard/>
        <LikedVideoCard/>
        <LikedVideoCard/>
        <LikedVideoCard/>
      </div>
    </div>
  )
}

export default LikedVideos
