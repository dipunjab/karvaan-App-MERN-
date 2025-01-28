import React from 'react'
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer';

const WatchVideo = () => {
    const { videoId } = useParams()

    const video = useSelector((state) =>
        state.video.videos.find((video) => video.id === videoId)
    );

    console.log(video.videoFile);

    return (
        <div className='ml-8'>
            <div className='flex flex-col'>
                <VideoPlayer videoSrc={video.videoFile} />
                <h1 className='mt-4 text-3xl font-medium'>{video.title}</h1>
                <p className='mt-2 text-[12px] md:text-[15px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum nisi, voluptatibus quisquam labore non earum excepturi tenetur, quae asperiores ad, accusantium rem! Enim perferendis aut sunt quibusdam, et earum unde.</p>
                <h1 className='mt-2 font-medium text-gray-500'>Views: {video.views}</h1>
                <div className='flex w-10 h-10 mb-2 shadow shadow-gray-500 rounded-[50px] mt-4'>
                    <img src={video.userpfp} alt="profileIcon" className='rounded-[50px]'/>
                    <h2 className='ml-2 mt-2 font-extralight text-[14px] text-gray-600'>{video.username}</h2>
                </div>
            </div>


        </div>
    )
}

export default WatchVideo
