import React, { useEffect, useState } from 'react'
import VideoCard from '../components/VideoCard';
import axios from 'axios';

const History = () => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        ; (
            async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/users/watch-history`, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                        }
                    });

                    setVideos(response.data.data)

                } catch (error) {
                    console.log(error);

                }
            }
        )()
    }, [])

    const handleClearHistory = async()=>{
        try {
            const response = await axios.patch(`${import.meta.env.VITE_API_BACKEND}/users/watch-history`,{}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            setVideos(response.data.data)            
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div>
            <div>
                <div className='flex justify-between'>
                    <h1 className='ml-12 sm:ml-2 text-4xl text-gray-900 font-bold'>History</h1>
                    <button className='bg-gray-200 p-3 rounded-4xl sm:w-15md:w-30 font-semibold hover:bg-gray-400 cursor-pointer' onClick={handleClearHistory}>Clear All</button>
                </div>
                <div className='mt-6 flex gap-4 justify-center items-center'>
                    <h2 className='p-2 rounded-4xl bg-green-400 w-30 text-center cursor-pointer hover:bg-green-300'>Videos</h2>
                </div>
            </div>
            <div className='ml-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4'>
                {videos.length > 0 ?(

                    videos.map((video) => (
                        <div key={video._id}>
                            <VideoCard {...video} owner={video.owner._id} />
                        </div>
                    ))
                ): <p>Cleared History</p>
                }
            </div>
        </div>
    )
}

export default History
