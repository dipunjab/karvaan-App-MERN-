import React from 'react'
import TweetsCard from '../components/TweetsCard'
import { useSelector } from 'react-redux'

const Tweets = () => {
  const tweets = useSelector((state) => state.tweet.tweets)

  return (
    <div>
      <h1 className='text-2xl font-bold text-gray-600 underline'>Here’s What People Are Saying.</h1>
      <div className='grid grid-rows-1'>
        {
          tweets.map((tweet) => (
            <div key={tweet.id}>
              <TweetsCard tweet={tweet}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Tweets
