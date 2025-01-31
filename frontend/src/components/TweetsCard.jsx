import React, { useState } from 'react';

import { SlLike } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { GoPaperAirplane } from "react-icons/go";
import CommentCard from './CommentCard';
import { useNavigate } from 'react-router-dom';


const TweetsCard = ({ tweet }) => {
    const [isLiked, setLiked] = useState(tweet.likedBy || true)
    const [comments, setComments] = useState(false)

    const navigate = useNavigate()

    const showComments = () => {
        setComments(!comments)
    }

    const handleReadMore = () => {
        navigate(`/fullTweet/${tweet.id}`)
    }

    return (
        <div className='bg-gray-100 p-3 rounded-2xl mt-3 shadow-md'>
            {/* Head of tweet card */}
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <div className='w-8 h-8 shadow shadow-gray-500 rounded-full overflow-hidden'>
                        <img src={tweet.userpfp || ""} alt="profileIcon" className='w-full h-full' />
                    </div>
                    <div className='flex'>
                        <div className='ml-3'>
                            <h2 className='text-gray-600 text-sm font-medium'>{tweet.username || "monkiee"}</h2>
                            <p className='text-gray-500 text-xs'>Subscribers: {tweet.totalSubscribers || "21"}</p>
                        </div>
                        <h1 className='ml-5 text-sm font-extrabold text-green-700'>{tweet.totalSubscribed ? ".Be Hamrah" : "✅ Hamrah" || ""}</h1>
                    </div>
                </div>
                <div>
                    <h2 className='text-gray-400 text-xs'>{tweet.createdAt | ""}</h2>
                </div>
            </div>
            {/* Tweet Content */}
            <div className='text-[13px] mt-2 p-2 font-medium'>
                {
                    tweet.content.length >= 10 ?
                        (
                            <p>
                                {tweet.content.slice(0,10)}
                                <span className='cursor-pointer font-bold text-green-500' onClick={handleReadMore}> ReadMore..</span>
                            </p>
                        ) : tweet.content
                }
            </div>
            {/* icons and input for remarks */}
            <div className='flex justify-between items-center'>
                <div className='flex gap-1 justify-center items-center'>
                    {
                        isLiked ?
                            <AiFillLike color='green' size={20} />
                            :
                            <SlLike color='green' className='cursor-pointer' />
                    }
                    <h2 className='text-[12px] text-green-700 font-semibold'>{tweet.totalLikes}</h2>
                    <div className='flex ml-5 md:ml-10 gap-1 justify-center items-center cursor-pointer' onClick={showComments}>
                        <AiOutlineComment size={20} color='green' />
                        <h2 className='text-[12px] text-green-700 font-semibold'>{tweet.comments.length || "0"}</h2>
                    </div>
                </div>
                <div className='flex justify-between items-center shadow rounded-3xl p-1 lg:p-2 bg-white'>
                    <input type="text" placeholder='Your Remarks' className='text-[14px] focus:outline-none lg:w-xs' />
                    <GoPaperAirplane />
                </div>
            </div>
            {
                comments && (
                    <div className='p-2'>
                        {tweet.comments.map((tComment) => (
                            <div key={tComment.id}>
                                <CommentCard {...tComment} />
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default TweetsCard;
