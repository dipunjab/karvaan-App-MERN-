import React, { useEffect, useState } from 'react'
import VideoCard from "../VideoCard"
import axios from 'axios'

const UserVideos = ({userId}) => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)


  

  useEffect(()=>{
    (
      async()=>{
        try {
          setLoading(true)
          const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/videos?userId=${userId}`)          
          setVideos(response.data.data.videos)
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
    {loading && <p>Wait...</p>}
    {videos.map((video)=> (
      <div key={video._id}>
        <VideoCard {...video}/>
      </div>
    ))}
    </>
  )
}

export default UserVideos
