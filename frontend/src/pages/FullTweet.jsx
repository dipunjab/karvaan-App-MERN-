import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toggleLike } from '../store/tweetsSlice';
import { AiFillLike, AiOutlineComment } from 'react-icons/ai';
import { SlLike } from 'react-icons/sl';
import { GoPaperAirplane } from 'react-icons/go';
import CommentCard from '../components/CommentCard';

const FullTweet = () => {
    const { tweetId } = useParams()
    const dispatch = useDispatch()

    const tweet = useSelector((state) =>
        state.tweet.tweets.find((tweet) => tweet.id === tweetId)
    );

    const [isLiked, setLiked] = useState(tweet.likedBy)


    const toggleLikeTweet = () => {
        dispatch(toggleLike(tweet.id));
        setLiked(!isLiked);
    };

    return (
        <div>
            <div className='p-6 md:mr-30'>
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
            </div>

            <hr className='mx-10 md:mr-40 mr-20 text-green-200 shadow-2xl my-2 mb-5 shadow-green-500' />

            <div className='mx-5 md:mr-50 bg-green-100 p-3 rounded-2xl'>
                <p>{tweet.content}</p>
            </div>

            <hr className='mx-10 md:mr-40 mr-30 text-green-200 shadow-2xl my-2 mb-5 mt-10 shadow-green-500' />


            <div className='md:flex justify-between items-center mx-20 mt-10'>
                <div className='flex justify-center items-center '>
                    <div onClick={toggleLikeTweet} className='flex gap-1 md:mb-0 justify-center items-center'>
                        { 
                            isLiked ?
                                <AiFillLike color='green' size={30} />
                                :
                                <SlLike size={30} color='green' className='cursor-pointer' />
                        }
                        <h2 className='text-[12px] text-green-700 font-semibold'>{tweet.totalLikes}</h2>
                    </div>
                    <div className='flex ml-5 md:ml-10 gap-1 justify-center items-center cursor-pointer'>
                        <AiOutlineComment size={30} color='green' />
                        <h2 className='text-[12px] text-green-700 font-semibold'>{tweet.comments.length || "0"}</h2>
                    </div>
                </div>
                <div className='flex justify-between items-center shadow rounded-3xl p-1 lg:p-2 bg-white'>
                    <input type="text" placeholder='Your Remarks' className='text-[14px] focus:outline-none lg:w-xs p-2 mx-2 ' />
                    <GoPaperAirplane />
                </div>
            </div>
            <div>
                <div>
                <h1  className='text-center my-5 font-medium text-2xl text-green-950'>All Remarks</h1>
                </div>
                <div className='ml-2 md:ml-0  shadow p-1 w-full shadow-green-200'>

                    {
                        tweet.comments && (
                            <div className='p-2'>
                                {tweet.comments.map((tComment) => (
                                    <div key={tComment.id} className='shadow shadow-green-300 rounded'>
                                        <CommentCard {...tComment} />
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default FullTweet
