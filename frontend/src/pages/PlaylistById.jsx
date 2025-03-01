import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

  const [modal, setModal] = useState(false)
  const confirmdeletePlaylist = () => {
    setModal(true)
  }

  const navigate = useNavigate()

  const deletePlaylist = async()=>{
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BACKEND}/playlist/${playlistId}`
        ,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      console.log(response);
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
      alert("Playlist Deleted Successfully")
      navigate("/playlists")
    }
  }

  return (
    <div>
      <h1 className='font-bold text-2xl'>Name: <span className='font-semibold text-3xl ml-2'>{playlistData.name}</span></h1>
      <p className='font-bold text-2xl mb-5'>Descrciption: <span className='font-normal text-xl ml-2'>{playlistData.description}</span></p>

      <div>
        <button className='border border-red-500 p-1 rounded-full bg-red-500 hover:bg-red-400 font-semibold cursor-pointer mb-5' onClick={confirmdeletePlaylist}>Delete Playlist</button>
        {modal && (
          <div className='bg-gray-200 p-3 mb-5 rounded-3xl'>
            <p className='text-xs'>Are you sure you want to delete this Playlist=<span className='font-semibold'>{playlistData.name}</span>?</p>

            <div className='flex gap-10 mt-4'>
              <button className='p-1 rounded-full bg-white hover:bg-gray-300 font-semibold cursor-pointer mb-5' onClick={()=> setModal(false)}>Cancel</button>
              <button className='border border-green-500 p-1 rounded-full bg-green-500 hover:bg-green-400 font-semibold cursor-pointer mb-5' onClick={deletePlaylist}>Confirm</button>
            </div>
          </div>
        )}
      </div>

      <div className='mb-5'>
        <label htmlFor="videoId">VideoId</label>
        <input onChange={(e) => setVideoIdToBeAdd(e.target.value)} type="text" placeholder='video-id-to-add' className='border border-gray-300 ml-2 mr-3 p-1 rounded-4xl' />
        <button className='border border-green-500 p-1 rounded-full bg-green-500 hover:bg-green-400 font-bold cursor-pointer' onClick={addVideoToPlaylist}>Add To List</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : playlistVideos.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
              <button onClick={() => removeVideofromplaylist(video._id)} className='bg-green-800 font-bold text-white rounded-3xl p-2 cursor-pointer hover:bg-green-500'>Remove</button>
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
