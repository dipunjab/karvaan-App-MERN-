import React from 'react';
import VideoCard from '../components/videoCard';
import { useSelector } from 'react-redux';
//title, thumbnail, username, userpfp, createdAt, views

const Home = () => {

   const getAllVideos = useSelector((state) => state.video.videos);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
      {getAllVideos.map((video)=> (
        <div key={video.title}>
          <VideoCard {...video}/>
        </div>
      ))}
    </div>
  );
};

export default Home;
