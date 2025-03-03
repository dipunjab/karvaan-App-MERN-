import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [inputValue, setInput] = useState("");
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(""); 

  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500); 

    return () => clearTimeout(handler); 
  }, [inputValue]);

  useEffect(() => {
    if (!debouncedValue) {
      setVideo([]); 
      return;
    }

    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BACKEND}/videos?query=${debouncedValue}`
        );
        setVideo(response.data.data.videos.map((video) => [video._id, video.title]));
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [debouncedValue]); 

  const navToWatch = (id) => {
    navigate(`/watchvideo/${id}`);
    setInput("")
  };

  return (
    <>
      <div className="flex border border-gray-300 p-2 w-[150px] sm:w-[250px] md:w-[400px] lg:w-[600px] rounded-3xl">
        <input
          type="text"
          placeholder="Search"
          className="w-[30px] sm:w-[120px] md:w-[280px] lg:w-[500px] focus:outline-none focus:ring-0 focus:border-gray-300 ml-2"
          onChange={(e) => setInput(e.target.value)}
        />
        <IoMdSearch size={20} className="ml-20 cursor-pointer" />
      </div>

      {debouncedValue && (
        <div className="p-2 bg-gray-300 mt-2 rounded-3xl max-h-54 overflow-y-auto">
          {loading ? (
            <p>Loading...</p>
          ) : (
            video.map((video) => (
              <div
                onClick={() => navToWatch(video[0])} 
                key={video[0]}
                className="p-1 mb-2 hover:bg-gray-200 cursor-pointer"
              >
                <h2>{video[1]}</h2>
                <hr />
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default SearchInput;
