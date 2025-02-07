import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer';
import SubscribedButton from '../components/SubscribedButton';
import { SlLike } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";

import CommentCard from '../components/CommentCard';
import { GoPaperAirplane } from 'react-icons/go';
import axios from 'axios';

const WatchVideo = () => {

    const { videoId } = useParams()
    const [loading, setLoading] = useState(null)
    const [videoData, setVideoData] = useState({})
    const currentUser = useSelector((state) => state.auth.userData);
    const authentication = useSelector((state) => state.auth.status);
    const curUserId = currentUser?.userData?.data._id

    const [videoOwner, setOwner] = useState(null)
    const [isLiked, setLiked] = useState()
    const [comments, setComments] = useState([])
    const [userChannel, setUserChannel] = useState(false)
    const [isSubscribed, setSubscribed] = useState()

    //isLiked Video by user
    useEffect(() => {
        if (videoId && authentication) {
            (async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/likes/status/v/${videoId}`,
                        {
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                            }
                        }
                    );
                    setLiked(response.data.data.isLiked);

                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [videoId]);

    //for fetching video
    useEffect(() => {
        ; (
            async () => {
                try {
                    setLoading(true)
                    const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/videos/${videoId}`, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                        }
                    })
                    setVideoData(response.data.data)
                    setOwner(response.data.data.owner)
                } catch (error) {
                    setLoading(false)
                } finally {
                    setLoading(false)
                }
            }
        )()
    }, [])

    //for fetching video owner 
    const [username, setUsername] = useState("")
    const [userpfp, setUserPfp] = useState("")
    useEffect(() => {
        if (videoOwner) {

            ; (
                async () => {
                    try {
                        setLoading(true)
                        const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/users/userbyid/${videoOwner}`)
                        setUsername(response.data.data.username)
                        setUserPfp(response.data.data.avatar)
                        // console.log({
                        //     v: videoOwner,
                        //     u: curUserId
                        // })

                        if (videoOwner === curUserId) {
                            setUserChannel(true)
                        }
                        else {
                            setUserChannel(false)
                        }
                    } catch (error) {
                        setLoading(false)
                    } finally {
                        setLoading(false)
                    }
                }
            )()
        }
    }, [videoOwner, videoId])

    // for likes 
    const [totalLiks, setLikesTotal] = useState(null)
    useEffect(() => {
        if (authentication) {

            ; (
                async () => {
                    try {
                        setLoading(true)
                        const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/likes/toggle/v/${videoId}`, {
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                            }
                        })
                        setLikesTotal(response.data.data.totalLikes)
                    } catch (error) {
                        setLoading(false)
                    } finally {
                        setLoading(false)
                    }
                }
            )()
        }
    }, [isLiked, authentication])

    const toggleLikeVideo = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BACKEND}/likes/toggle/v/${videoId}`, {}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            if (response.data.message === "Successfully unliked the video.") {
                setLiked(false);
            } else {
                setLiked(true)
            }

        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    // for fetching Comments
    useEffect(() => {
        if (authentication) {

            ; (
                async () => {
                    try {
                        setLoading(true)
                        const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/comments/v/${videoId}`, {
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                            }
                        })
                        setComments(response.data.data.data)
                        
                    } catch (error) {
                        setLoading(false)
                    } finally {
                        setLoading(false)
                    }
                }
            )()
        }
    }, [authentication])

    const handleCommentDeleted = (deletedCommentId) => {
        setComments(comments.filter(comment => comment._id !== deletedCommentId));
    };

    const [addComment, setAddComment] = useState("")

    //addComment
    const handleAddComment = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_API_BACKEND}/comments/v/${videoId}`,
                {
                    content: addComment
                },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
            setComments(prevComments => [response.data.data, ...prevComments])
            setAddComment("")
        } catch (error) {
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }


    //isSubscribed by curr user
    useEffect(() => {
        if (videoOwner && authentication) {

            (
                async () => {
                    try {
                        setLoading(true)
                        const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/subscriptions/status/c/${videoOwner}`, {
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                            }
                        })
                        setSubscribed(response.data.data.isSubscribed);

                    } catch (error) {
                        setLoading(false)
                    } finally {
                        setLoading(false)
                    }
                }
            )()
        }
    }, [videoId, videoOwner])

    const toggleSubscription = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BACKEND}/subscriptions/c/${videoOwner}`, {}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            setSubscribed(prev => !prev);  


        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    return (
        <div className='ml-8 flex lg:flex-row flex-col gap-10'>
            <div className='flex flex-col'>
                <VideoPlayer videoSrc={videoData.videoFile} />
                <h1 className='mt-4 text-3xl font-medium'>{videoData.title}</h1>
                <p className='mt-2 text-[12px] md:text-[15px] lg:w-[720px]'>{videoData.description}</p>
                <div className='flex justify-start items-center gap-20'>
                    <h1 className='mt-2 font-medium text-gray-500'>Views: {videoData.views}</h1>
                    <p>{new Date(videoData.createdAt).toDateString()}</p>
                    {authentication &&
                        <div className='flex justify-center items-center mt-2 gap-4' onClick={toggleLikeVideo}>

                            {
                                isLiked ?
                                    <AiFillLike color='green' size={30} className='cursor-pointer' />
                                    :
                                    <SlLike color='green' className='cursor-pointer' size={30} />
                            }
                            <h2 className='text-[12px] text-green-700 font-semibold'>{totalLiks}</h2>
                        </div>
                    }
                </div>

                <div className='flex mt-4 justify-between items-center p-1'>
                    <div className='flex w-10 h-10 mb-2 shadow shadow-gray-500 rounded-[50px]'>
                        <img src={userpfp} alt="profileIcon" className='rounded-[50px]' />
                        <h2 className='ml-2 mt-2 font-extralight text-[14px] text-gray-600'>{username}</h2>
                    </div>
                    {authentication &&
                        <div className='mb-2'>
                            {!userChannel ?
                                (<div onClick={toggleSubscription}>
                                    <SubscribedButton iSubscribed={isSubscribed} />
                                </div>)
                                : null}

                        </div>
                    }
                </div>
            </div>
            {/* Comments of the video */}
            {authentication ?
                <div className='lg:overflow-y-hidden lg:w-[420px] p-3  bg-gray-100 shadow-green-200 shadow drop-shadow-md rounded-4xl lg:rounded-2xl lg:h-[calc(100vh-7rem)]'>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='text-center font-semibold text-2xl'>Comments .</h1>
                        <p className='font-light text-[23px]'>({comments.length})</p>
                    </div>
                    <div className='flex justify-between items-center bg-white mb-3 mt-2 rounded-4xl p-2 focus:none'>
                        <input type="text" placeholder='Your Comment' className='focus:outline-none w-[280px]' value={addComment} onChange={(e) => setAddComment(e.target.value)} />
                        <GoPaperAirplane onClick={handleAddComment} />
                    </div>
                    <div className='lg:overflow-y-scroll lg:h-[calc(100vh-14rem)]'>
                        <div className='lg:mr-2'>
                            {comments.length > 0 ? comments.map((comment) => (
                                <div key={comment._id}>
                                    <CommentCard {...comment} onCommentDeleted={handleCommentDeleted}
                                    />
                                </div>
                            ))
                                : <>No Comments</>}
                        </div>
                    </div>
                </div>
                : (
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='text-center font-semibold text-2xl'>Login To See Comments.</h1>
                    </div>
                )
            }

        </div>
    )
}

export default WatchVideo