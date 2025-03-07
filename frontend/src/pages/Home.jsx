import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import axios from "axios";
import lodainggif from "../assets/Loading.gif"

const Home = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)


  

  useEffect(()=>{
    (
      async()=>{
        try {
          setLoading(true)
          const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/videos/`)          
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
      {loading && <p>Loading videos...</p>}
      {videos.length > 0 &&
        videos.map((video) => (
          <VideoCard key={video._id} {...video} />
        ))}
        {loading && (
                <div className='fixed top-[50%] left-[50%]'>
                <img src={lodainggif} className='md:w-40 w-20'/>
            </div>
            )}
    </div>
  );
};

export default Home;
