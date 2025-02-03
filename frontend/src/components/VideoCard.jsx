import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({_id,title, thumbnail, owner, createdAt, views=0}) => {
    const navigate = useNavigate()

    const openVideo = ()=>{
        navigate(`/watchvideo/${_id}`)
    }

    const [username, setUsername] = useState("")
    const [userpfp, setUserPfp] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
  
    useEffect(()=>{
      if(_id){

        (
          async() =>{
          try {
            setError(false)
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/users/userbyid/${owner}`)
            setUsername(response.data.data.username)
            setUserPfp(response.data.data.avatar)
          } catch (error) {
            setError(true)
            setLoading(false)
          } finally{
            setLoading(false)
          }
        }
      )()
    }
    },[_id])

    return (
        <div onClick={openVideo}
            className="flex flex-col mt-4 rounded-2xl w-full hover:shadow hover:shadow-gray-300 cursor-pointer">
            <div className='w-full'>
                <img src={thumbnail} alt="" className='h-48 w-full rounded-2xl' />
            </div>
            <div className='ml-2 mb-2 mt-2'>
                <h1 className='font-montserrat text-[16px] font-bold'>{title}</h1>
            </div>
            <div className='ml-1 flex gap-30'>
                <div className='flex w-10 h-10 mb-2 shadow shadow-gray-500 rounded-[50px]'>
                    <img src={userpfp} alt="profileIcon" className='rounded-[50px]'/>
                    <h2 className='ml-2 mt-2 font-extralight text-[14px] text-gray-400'>{username}</h2>
                </div>
                 <div className='ml-4 text-[12px] text-gray-500'>
                    <p>Views: {views}</p>
                    <p>{new Date(createdAt).toDateString()}</p>
                </div>   
            </div>
        </div>
    );
};

export default VideoCard;
