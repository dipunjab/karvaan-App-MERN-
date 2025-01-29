import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer';
import SubscribedButton from '../components/SubscribedButton';
import { SlLike } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";

import { toggleLike } from '../store/videosSlice';
import CommentCard from '../components/CommentCard';
import { GoPaperAirplane } from 'react-icons/go';

const WatchVideo = () => {

    const { videoId } = useParams()
    const dispatch = useDispatch()

    const video = useSelector((state) =>
        state.video.videos.find((video) => video.id === videoId)
    );

    const [isLiked, setLiked] = useState(video.likedBy)

    const toggleLikeVideo = () => {
        dispatch(toggleLike(video.id));
        setLiked(!isLiked);
    };


    return (
        <div className='ml-8 flex lg:flex-row flex-col gap-10'>
            <div className='flex flex-col'>
                <VideoPlayer videoSrc={video.videoFile} />
                <h1 className='mt-4 text-3xl font-medium'>{video.title}</h1>
                <p className='mt-2 text-[12px] md:text-[15px] lg:w-[720px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum nisi, voluptatibus quisquam labore non earum excepturi tenetur, quae asperiores ad, accusantium rem! Enim perferendis aut sunt quibusdam, et earum unde.</p>
                <div className='flex justify-start items-center gap-20'>
                    <h1 className='mt-2 font-medium text-gray-500'>Views: {video.views}</h1>
                    <div className='flex justify-center items-center mt-2 gap-4' onClick={toggleLikeVideo}>

                        {
                            isLiked ?
                                <AiFillLike color='green' size={30} className='cursor-pointer' />
                                :
                                <SlLike color='green' className='cursor-pointer' size={30} />
                        }
                        <h2 className='text-[12px] text-green-700 font-semibold'>20</h2>
                    </div>
                </div>

                <div className='flex mt-4 justify-between items-center p-1'>
                    <div className='flex w-10 h-10 mb-2 shadow shadow-gray-500 rounded-[50px]'>
                        <img src={video.userpfp} alt="profileIcon" className='rounded-[50px]' />
                        <h2 className='ml-2 mt-2 font-extralight text-[14px] text-gray-600'>{video.username}</h2>
                    </div>
                    <div className='mb-2'>
                        <SubscribedButton iSubscribed={true} />
                    </div>
                </div>
            </div>

            {/* Comments of the video */}
            <div className='lg:overflow-y-hidden lg:w-[420px] p-3  bg-gray-100 shadow-green-200 shadow drop-shadow-md rounded-4xl lg:rounded-2xl lg:h-[calc(100vh-7rem)]'>
                <div className='flex justify-start items-center gap-3'>
                    <h1 className='text-center font-semibold text-2xl'>Comments .</h1>
                    <p className='font-light text-[23px]'>(332)</p>
                </div>
                <div className='flex justify-between items-center bg-white mb-3 mt-2 rounded-4xl p-2 focus:none'>
                    <input type="text" placeholder='Your Comment' className='focus:outline-none w-[280px]' />
                    <GoPaperAirplane />
                </div>
                <div className='lg:overflow-y-scroll lg:h-[calc(100vh-14rem)]'>
                    <div className='lg:mr-2'>
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WatchVideo
