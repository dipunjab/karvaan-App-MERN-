import React, { useEffect, useState } from 'react';

import { SlLike } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { GoPaperAirplane } from "react-icons/go";
import CommentCard from './CommentCard';
import axios from 'axios';
import { useSelector } from 'react-redux';

const TweetsCard = ({ tweet, isSubscribed, toggleSubscription, tweetDeleted, hideInput }) => {
    const [isLiked, setLiked] = useState(false)
    const [comments, setComments] = useState(false)
    const [loading, setLoading] = useState(false)

    const currentUser = useSelector((state) => state.auth.userData);
    const curUserId = currentUser?.userData?.data._id
    const [userChannel, setUserChannel] = useState(false)
    const [totalLikes, setTotalLikes] = useState(0)
    const [tweetComments, setTweetComments] = useState([])
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(tweet.content);

    const showComments = () => {
        setComments(!comments)
    }

    const [visibleWords, setVisibleWords] = useState(10);

    const handleReadMore = () => {
        setVisibleWords((prevVisibleWords) => prevVisibleWords + 15);
    };

    const words = tweet.content.split(" ");
    const isMoreToShow = visibleWords < words.length;

        //islikedbyUser
        useEffect(() => {
            if (tweet) {
                ; (
                    async () => {
                        try {
                            setLoading(true)
                            const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/likes/status/t/${tweet._id}`, {
                                headers: {
                                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                                }
                            })
                            setLiked(response.data.data.isLiked);
    
                        } catch (error) {
                            setLoading(false)
                        } finally {
                            setLoading(false)
                        }
                    }
                )()
            }
        }, [tweet._id]);


    //owner of tweet
    const [username, setUsername] = useState("")
    const [pfp, setPfp] = useState("")
    useEffect(() => {
        if (tweet) {
            ; (
                async () => {
                    try {
                        setLoading(true)
                        const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/users/userbyid/${tweet.owner}`)
                        setUsername(response.data.data.username)
                        setPfp(response.data.data.avatar)

                        if (tweet.owner === curUserId) {
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
    }, [tweet]);



    useEffect(() => {
        if (tweet) {
            ; (async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/likes/toggle/t/${tweet._id}`, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                        }
                    });
                    setTotalLikes(response.data.data.totalLikes);
                } catch (error) {
                    console.error("Error fetching total likes:", error);
                }
            })();
        }
    }, [isLiked]);

    //toggle Like
    const toggleLike = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_API_BACKEND}/likes/toggle/t/${tweet._id}`, {}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            if (response.data.message === "Successfully unliked the tweet") {
                setLiked(false);
            }else {
                setLiked(true);
            }
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    //Tweet Comments
    useEffect(() => {
        if (currentUser) {
            ; (
                async () => {
                    try {
                        setLoading(true)
                        const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/comments/t/${tweet._id}`, {
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                            }
                        })
                        setTweetComments(response.data.data.data)                        
                    } catch (error) {
                        setLoading(false)
                    } finally {
                        setLoading(false)
                    }
                }
            )()
        }
    }, [tweet._id])

    const handleCommentDeleted = (deletedCommentId) => {
        setTweetComments(tweetComments.filter(comment => comment._id !== deletedCommentId));
    };

    const [addComment, setAddComment] = useState("")

    //addComment
    const handleAddComment = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_API_BACKEND}/comments/t/${tweet._id}`,
                {
                    content: addComment
                },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
            setTweetComments(prevComments => [response.data.data, ...prevComments])
        } catch (error) {
            setLoading(false)
        } finally {
            setAddComment("")
            setLoading(false)
        }
    }

    const deleteTweet = async () => {
        try {
            setLoading(true)
            const response = await axios.delete(`${import.meta.env.VITE_API_BACKEND}/tweets/${tweet._id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            console.log(response);

            if (tweetDeleted) {
                tweetDeleted(tweet._id);
            }

        } catch (error) {
            setLoading(false)
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    }

    // Edit Tweet 
    const handleEdit = async () => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_BACKEND}/tweets/${tweet._id}`,
                {
                    content: editedContent,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    //totalSubscribers
    const [totalSubscriber , setSub] = useState(0)
    useEffect(()=>{
        ;(
            async()=>{
                try {
                    const res = await axios.get(`${import.meta.env.VITE_API_BACKEND}/subscriptions/c/${tweet.owner}`,
                        {
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                            }
                        });
                        setSub(res.data.data.length);
                        
                } catch (error) {
                    
                }
            }
        )()
    },[isSubscribed])

    return (
        <div className='bg-gray-100 p-3 rounded-2xl mt-3 shadow-md'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <div className='w-8 h-8 shadow rounded-full overflow-hidden'>
                        <img src={pfp} alt="profileIcon" className='w-full h-full' />
                    </div>
                    <div className='ml-3'>
                        <h2 className='text-gray-600 text-[10px] sm:text-sm font-medium'>{username}</h2>
                        <p className='text-gray-500 text-[8px] sm:text-xs'>Subscribers: {totalSubscriber}</p>
                    </div>
                    {!userChannel && (
                        <h1 className='ml-5 text-[8px] sm:text-sm font-extrabold text-green-700 cursor-pointer' onClick={toggleSubscription}>
                            {!isSubscribed ? ".Be Hamrah" : "✅ Hamrah"}
                        </h1>
                    )}
                </div>
                <div>
                    <h2 className='text-gray-400 text-[7px] sm:text-xs'>{new Date(tweet.createdAt).toDateString()}</h2>
                </div>
            </div>

            {/* Tweet Content */}
            <div className='text-[13px] mt-2 p-2 font-medium'>
                {isEditing ?
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className='w-full p-2 border border-gray-300 rounded-lg'
                    />
                    :
                    <p>
                        {words.slice(0, visibleWords).join(" ")}
                        {isMoreToShow && (
                            <span
                                className='cursor-pointer font-bold text-green-500 ml-1'
                                onClick={handleReadMore}
                            >
                                Read More...
                            </span>
                        )}
                    </p>
                }
            </div>

            {/* Like & Comment Section */}
            <div className='flex justify-between items-center'>
                <div className='flex gap-1 items-center' onClick={toggleLike}>
                    {isLiked ? <AiFillLike color='green' className='cursor-pointer' size={20} /> : <SlLike color='green' className='cursor-pointer' size={20} />}
                    <h2 className='text-[12px] text-green-700 font-semibold'>{totalLikes}</h2>

                    <div className='flex ml-5 gap-1 items-center cursor-pointer' onClick={showComments}>
                        <AiOutlineComment size={20} color='green' />
                        <h2 className='text-[12px] text-green-700 font-semibold'>{tweetComments.length}</h2>
                    </div>
                    {userChannel && (
                        <div className='flex items-center justify-center gap-2 ml-2 mr-2 '>
                           {isEditing ? (
                            <>
                                <button
                                    className='text-green-500 cursor-pointer'
                                    onClick={handleEdit}
                                >
                                    Save
                                </button>
                                <button
                                    className='text-gray-500 cursor-pointer'
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className='text-blue-500 cursor-pointer'
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit
                                </button>
                                <button
                                    className='text-red-500 cursor-pointer'
                                    onClick={deleteTweet}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                        </div>
                    )}
                </div>
                <div className='flex items-center shadow rounded-3xl p-1 bg-white'>
                    <input type="text" placeholder='Your Remarks' className='text-[8px] sm:text-[14px] focus:outline-none' value={addComment} onChange={(e) => setAddComment(e.target.value)} />
                    <GoPaperAirplane onClick={handleAddComment} />
                </div>
            </div>

            {/* Comments Section */}
            {comments && (
                <div className='p-2'>
                    {tweetComments.map(tComment => (
                        <CommentCard key={tComment._id} {...tComment} onCommentDeleted={handleCommentDeleted} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TweetsCard;
