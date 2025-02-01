import React, { useEffect } from "react";
import ButtonVideoCard from "../components/ButtonVideoCard";
import { useDispatch, useSelector } from "react-redux";

const LikedVideos = () => {
  const dispatch = useDispatch()
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
          <div key={video.title}>
            <ButtonVideoCard {...video} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedVideos;
