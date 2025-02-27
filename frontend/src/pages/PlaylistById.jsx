import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';

const PlaylistById = () => {
  const { playlistId } = useParams();
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [playlistData, setPlaylistData] = useState({});
  const [loading, setLoading] = useState(true);

  const [videoIdToBeAdd, setVideoIdToBeAdd] = useState("")
  // Fetch playlist data
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BACKEND}/playlist/${playlistId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );

        setPlaylistData(response.data.data);
        const videoIds = response.data.data.videos;

        // Fetch video details for each ID
        if (videoIds.length > 0) {
          const videoPromises = videoIds.map((id) =>
            axios.get(`${import.meta.env.VITE_API_BACKEND}/videos/${id}`)
          );

          const videoResponses = await Promise.all(videoPromises);
          const videos = videoResponses.map((res) => res.data.data);

          setPlaylistVideos(videos);
        }
      } catch (error) {
        console.error('Error fetching playlist:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [setPlaylistVideos]);

  const addVideoToPlaylist = async () => {
    ///add/:videoId/:playlistId
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BACKEND}/playlist/add/${videoIdToBeAdd}/${playlistId}`,
        {}
        ,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      const newVideoResponse = await axios.get(`${import.meta.env.VITE_API_BACKEND}/videos/${videoIdToBeAdd}`);
      const newVideo = newVideoResponse.data.data;
  
      // Update state by adding the full video details
      setPlaylistVideos((prevVideos) => [...prevVideos, newVideo]);

      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
      setVideoIdToBeAdd("")
    }
  }

  const removeVideofromplaylist = async (videoIdtoRemove) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BACKEND}/playlist/remove/${videoIdtoRemove}/${playlistId}`,
        {}
        ,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      setPlaylistVideos(response.data.data.videos);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
      setVideoIdToBeAdd("")
    }
  }

  return (
    <div>
      <h1>{playlistData.name}</h1>
      <p>{playlistData.description}</p>

      <div>
        <label htmlFor="videoId">VideoId</label>
        <input onChange={(e) => setVideoIdToBeAdd(e.target.value)} type="text" placeholder='video-id-to-add' className='border border-gray-300 ml-2 mr-3 p-1 rounded-4xl' />
        <button className='border border-green-500 p-1 rounded-full bg-green-500 hover:bg-green-400 font-bold cursor-pointer' onClick={addVideoToPlaylist}>Add To List</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : playlistVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlistVideos.map((video) => (
            <div key={video._id}>
              <VideoCard
                _id={video._id}
                title={video.title}
                thumbnail={video.thumbnail}
                owner={video.owner}
                createdAt={video.createdAt}
                views={video.views || 0}
              />
              <button onClick={()=>removeVideofromplaylist(video._id)} className='bg-green-800 font-bold text-white rounded-3xl p-2 cursor-pointer hover:bg-green-500'>Remove</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No videos found in this playlist.</p>
      )}
    </div>
  );
};

export default PlaylistById;
