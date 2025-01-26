import React from 'react'
import TweetsCard from '../components/TweetsCard'

const Tweets = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold text-gray-600 underline'>Here’s What People Are Saying.</h1>
      <div className='grid grid-rows-1'>
        <TweetsCard/>
        <TweetsCard/>
        <TweetsCard/>
      </div>
    </div>
  )
}

export default Tweets
