import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import axios from "axios";
import lodainggif from "../assets/Loading.gif"

const LikedVideos = () => {
  const [likedVideos, setLikedVideos] = useState([])
  const [loading, setloading] = useState(false)

  useEffect(() => {
    ; (
      async () => {
        try {
          setloading(true)
          const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/likes/videos/`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }

          });
          setLikedVideos(response.data.data);
        } catch (error) {
          setloading(false)
        } finally{
          setloading(false)
        }
      }
    )()
  }, [])

  return (
    <div>
      <h1 className="ml-8 sm:ml-2 text-4xl text-gray-900 font-bold">
        Liked Videos{" "}
        <span className="text-2xl font-medium text-gray-300">
          {" "}
          <span className="text-4xl">.</span> ({likedVideos.length})
        </span>
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-6 ml-8 sm:ml-2">
        {likedVideos.map((video) => (
          <div key={video._id}>
            <VideoCard {...video.likedVideoDetail} />
          </div>
        ))}
      </div>
      {loading && (
        <div className='fixed top-[50%] left-[50%]'>
          <img src={lodainggif} className='md:w-40 w-20' />
        </div>
      )}
    </div>
  );
};

export default LikedVideos;
