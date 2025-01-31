import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({id,title, thumbnail, username, userpfp, createdAt, views}) => {
    const navigate = useNavigate()

    const openVideo = ()=>{
        navigate(`/watchvideo/${id}?username=${username}`)
    }

    return (
        <div onClick={openVideo}
            className="flex flex-col mt-4 rounded-2xl w-full hover:shadow hover:shadow-gray-300 cursor-pointer">
            <div className='w-full'>
                <img src={thumbnail ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiPVeyknfx5n-IXy6-QAKaIasjbZZyc2Lh1w&s"} alt="" className='h-48 w-full rounded-2xl' />
            </div>
            <div className='ml-2 mb-2 mt-2'>
                <h1 className='font-montserrat text-[16px] font-bold'>{title}</h1>
            </div>
            <div className='ml-1 flex gap-24'>
                <div className='flex w-10 h-10 mb-2 shadow shadow-gray-500 rounded-[50px]'>
                    <img src={userpfp || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiPVeyknfx5n-IXy6-QAKaIasjbZZyc2Lh1w&s"} alt="profileIcon" className='rounded-[50px]'/>
                    <h2 className='ml-2 mt-2 font-extralight text-[14px] text-gray-400'>{username}</h2>
                </div>
                 <div className='ml-4 text-[12px] text-gray-500'>
                    <p>Views: {views}</p>
                    <p>{createdAt}</p>
                </div>   
            </div>
        </div>
    );
};

export default VideoCard;
