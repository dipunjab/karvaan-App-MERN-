import React from 'react'
import YourVideosCard from '../components/YourVideosCard'

const YourVideos = () => {
  return (
    <div className='ml-6 md:ml-4'>
            <h1 className='ml-8 sm:ml-2 text-4xl text-gray-900 font-bold'>
                Your Videos <span className='text-2xl font-medium text-gray-300'>
                    <span className='text-4xl'>
                         .
                    </span> (6)
                </span>
            </h1>
            <div className='grid grid-cols-1 mt-6 ml-8'>
                <YourVideosCard/>
                <YourVideosCard/>
                <YourVideosCard/>
                <YourVideosCard/>
                <YourVideosCard/>
                <YourVideosCard/>
            </div>
    </div>
  )
}

export default YourVideos
