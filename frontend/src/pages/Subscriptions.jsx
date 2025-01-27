import React from 'react'
import ChannelCard from '../components/ChannelCard'

const Subscriptions = () => {
  return (
    <div>
      <h1 className='ml-8 sm:ml-2 text-4xl text-gray-900 font-semibold'>Subscribed <span className='text-green-400'>Rahi's</span></h1>
        <div className='grid grid-cols-1 mt-16'>
         <ChannelCard/>   
         <ChannelCard/>   
         <ChannelCard/>   
        </div>
    </div>
  )
}

export default Subscriptions
