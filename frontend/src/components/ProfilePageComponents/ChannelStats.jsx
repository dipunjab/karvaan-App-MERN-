import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ChannelStats = ({userId}) => {
  const [loading, setLoading] = useState(false)
  const [res, setRes] = useState([])
  const [channelDate, setDate] = useState("")

  useEffect(()=>{
    ;(
      async()=>{
        try {
          setLoading(true)
          const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/dashboard/stats/${userId}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
          })          
          setRes(response.data.data[0]);          
        } catch (error) {
          setLoading(false)
        } finally{
          setLoading(false)
        }
      }
    )()

  },[res])

  useEffect(()=>{
      (
        async() =>{
        try {
          setLoading(true)
          const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/users/userbyid/${userId}`)
          setDate(response.data.data.createdAt);
          
        } catch (error) {
          setLoading(false)
        } finally{
          setLoading(false)
        }
      }
    )()
  },[userId])

  return (
    <div className='font-bold text-2xl w-full lg:w-[1028px] flex gap-15 lg:gap-20'>
      <div className=''>
        <h1>TotalVideo: {res.totalVideos}</h1>
        <h1>TotalTweets: {res.totalTweets}</h1>
        <h1>TotalSubscribers: {res.subscribers}</h1>
        <h1>subscriptions: {res.subscribedTo}</h1>
      </div>
      <div>
        <h1>TotalLikes: {res.totalLikes}</h1>
        <h1>TotalViews: {res.totalViews}</h1>
        <h1>Channel createAt: {new Date(channelDate).toDateString()}</h1>
      </div>
    </div>
  )
}

export default ChannelStats
