import React from 'react'
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';

const YourVideosCard = ({_id, thumbnail, description, title, createdAt, views, onDelete}) => {
    
    const handleDelete = async()=>{
        const response = await axios.delete(`${import.meta.env.VITE_API_BACKEND}/videos/${_id}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
          })
          if(response){
            alert(`Video (${title}) deleted Successfully`)
            onDelete(_id)
          };
          
    }

    return (
        <div className='mt-4 shadow drop-shadow-sm shadow-green-500 flex p-2  bg-green-100 rounded-2xl'>
            <div className='w-26 h-26 rounded-2xl'>
                <img src={thumbnail} alt="" className='rounded-2xl' />
            </div>
            <div className='ml-3'>
                <h1 className='font-extrabold'>Title: <span className='font-light'>{title}</span></h1>
                <h1 className='font-extrabold'>Description: <span className='font-light text-[12px]'>{description}</span></h1>
                <div className='flex gap-10'>
                    <h1 className='font-bold text-[12px]'>Created At: <span className='font-light'>{createdAt}</span></h1>
                    <h1 className='font-bold text-[12px]'>Views: <span className='font-light'>{views}</span></h1>
                </div>
            </div>
            <div className='border-l-2 border-l-gray-50 ml-1'>
                <div className='flex justify-center mt-8 ml-3 gap-7 items-center'>
                <MdAutoDelete size={30} color='green' className='cursor-pointer' onClick={handleDelete}/>
                </div>
            </div>
        </div>
    )
}

export default YourVideosCard
