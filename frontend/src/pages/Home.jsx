import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideoCard from "../components/videoCard";
import { fetchVideos } from "../store/videosSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { videos, status, error } = useSelector((state) => state.video);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVideos()); 
    }
  }, [dispatch, status]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
      {status === "loading" && <p>Loading videos...</p>}
      {status === "failed" && <p>Error loading videos: {error}</p>}
      {videos.length > 0 &&
        videos.map((video) => (
          <VideoCard key={video._id} {...video} />
        ))}
    </div>
  );
};

export default Home;
