import React, { useEffect, useState } from 'react';
import { SlLike } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";
import axios from 'axios';
import { useSelector } from 'react-redux';

const CommentCard = ({ content, createdAt, commentBy, _id, onCommentDeleted }) => {
    const [loading, setLoading] = useState(false);
    const [isLiked, setLiked] = useState(false);
    const currentUser = useSelector((state) => state.auth.userData.userData.data);    
    const [username, setUsername] = useState("");
    const [userpfp, setUserPfp] = useState("");
    const [showOptions, setOptions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    useEffect(() => {
            (async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/likes/status/c/${_id}`,
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
    }, [setLiked]);

    // commentby
    useEffect(() => {
        if (commentBy) {
            (async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/users/userbyid/${commentBy}`);
                    setUsername(response.data.data.username);
                    setUserPfp(response.data.data.avatar);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [commentBy]);

    // Check if the current user is the owner of the comment
    useEffect(() => {
        if (currentUser && currentUser._id === commentBy) {
            setOptions(true);
        } else {
            setOptions(false);
        }
    }, [currentUser, commentBy]);

    // Delete Comment 
    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_BACKEND}/comments/c/v/${_id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            if (onCommentDeleted) {
                onCommentDeleted(_id);
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    // Edit Comment 
    const handleEdit = async () => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_BACKEND}/comments/c/v/${_id}`, 
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


    //commentsLikes
    const [totalLiks, setLikesTotal] = useState(0)
    useEffect(() => {
        ; (
            async () => {
                try {
                    setLoading(true)
                    const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/likes/toggle/c/${_id}`, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                        }
                    })
                    // setLikesTotal(response.data.data)
                    setLikesTotal(response.data.data.totalLikes);
                    
                } catch (error) {
                    setLoading(false)
                } finally {
                    setLoading(false)
                }
            }
        )()
    }, [isLiked])

    const toggleLikeComment = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BACKEND}/likes/toggle/c/${_id}`, {}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            if (response.data.message === "Successfully unliked the comment.") {
                setLiked(false);
            } else {
                setLiked(true)
            }

        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    //IsSubscribed


    return (
        <div className='bg-white p-2 rounded-2xl mt-3'>
            <div className='flex justify-between gap-4'>
                <div className='flex gap-4'>
                    <div className='w-8 h-8 shadow shadow-gray-500 rounded-full overflow-hidden'>
                        <img src={userpfp} alt="profileIcon" className='w-full h-full' />
                    </div>
                    <h1 className='font-light text-[15px]'>{username}</h1>
                </div>
                <h2 className='font-light text-[15px]'>{new Date(createdAt).toDateString()}</h2>
            </div>

            <hr className='mt-2 mb-2 text-gray-300' />

            <div className='p-2 rounded-3xl'>
                {isEditing ? (
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className='w-full p-2 border border-gray-300 rounded-lg'
                    />
                ) : (
                    <p className='font-light text-[15px]'>{editedContent}</p>
                )}
            </div>

            <div className='flex gap-2 mt-2'>
                {showOptions && (
                    <>
                        {isEditing ? (
                            <>
                                <button
                                    className='text-green-500'
                                    onClick={handleEdit}
                                >
                                    Save
                                </button>
                                <button
                                    className='text-gray-500'
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className='text-blue-500'
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit
                                </button>
                                <button
                                    className='text-red-500'
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>

            <div className='flex justify-end mt-2 gap-2 mr-3' onClick={toggleLikeComment}>
                {isLiked ? (
                    <AiFillLike
                        color='green'
                        size={25}
                        className='cursor-pointer'
                    />
                ) : (
                    <SlLike
                        color='green'
                        size={25}
                        className='cursor-pointer'
                    />
                )}
                <h2 className='text-[18px] text-green-700 font-semibold'>{totalLiks}</h2>
            </div>
        </div>
    );
};

export default CommentCard;
