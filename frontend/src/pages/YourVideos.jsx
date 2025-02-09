import React, { useEffect, useState } from 'react'
import YourVideosCard from '../components/YourVideosCard'
import axios from 'axios'
import { useSelector } from 'react-redux';

const YourVideos = () => {
  const [video, setVideo] = useState([])

  const currentUser = useSelector((state) => state.auth.userData);
  const curUserId = currentUser?.userData?.data._id

  useEffect(() => {
    ; (
      async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/videos/uservideos`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
          }
        })
        setVideo(response.data.data);
      }
    )()
  }, [])

  const handleVideoDeleted = (deletedvideoId) => {
    setVideo(video.filter(video => video._id !== deletedvideoId));
};

  return (
    <div className='ml-6 md:ml-4'>
      <h1 className='ml-8 sm:ml-2 text-4xl text-gray-900 font-bold'>
        Your Videos <span className='text-2xl font-medium text-gray-300'>
          <span className='text-4xl'>
            .
          </span> ({video.length})
        </span>
      </h1>
      <div className='grid grid-cols-1 mt-6 ml-8'>
        {video.map((video) => (
          <div key={video._id}>
          <YourVideosCard {...video} onDelete={handleVideoDeleted}/>
          </div>
        ))}

      </div>
    </div>
  )
}

export default YourVideos
