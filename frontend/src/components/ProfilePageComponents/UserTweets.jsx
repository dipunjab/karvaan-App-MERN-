import React, { useEffect, useState } from 'react'
import TweetsCard from '../TweetsCard'
import axios from 'axios'

const UserTweets = ({userId}) => {
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(false)


  

  useEffect(()=>{
    (
      async()=>{
        try {
          setLoading(true)
          const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/tweets/user/${userId}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
          })          
          setTweets(response.data.data);          
        } catch (error) {
          setLoading(false)
        } finally{
          setLoading(false)
        }
      }
    )()

  },[])

  return (
    <>
    {tweets.length > 0 ? tweets.map((tweet)=>(
      <div key={tweet._id}>
        <TweetsCard tweet={tweet} hideInput={false}/>
      </div>
    )): <p>No Tweets</p>}
    </>
  )
}

export default UserTweets
