import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from "../store/modalSlice"
import { RiImageEditLine } from "react-icons/ri";

import {
  UserPlaylist,
  UserTweets,
  UserVideos,
  ChannelStats
} from "../components/ProfilePageComponents/index"
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Videos");
  const authentication = useSelector((state) => state.auth.status);
  const navigate = useNavigate()

  useEffect(()=>{
    if(!authentication){
      return navigate("/")
    }
  },[])

  const dispatch = useDispatch()
  dispatch(closeModal())

  return (
    <div className='ml-2 sm:ml-10 mt-6 sm:mt-1'>
      <div className='relative'>
        <div className='rounded-2xl shadow-sm  shadow-green-200  w-full h-[270px]'>
          <img src="https://c4.wallpaperflare.com/wallpaper/55/890/455/artwork-nature-landscape-fantasy-art-fire-trees-lava-cherry-blossom-clouds-smoke-digital-art-fightstar-album-covers-wallpaper-preview.jpg" alt="coverImage" className='w-full h-[270px] rounded-2xl' />
          <div className='absolute top-60 right-2 group bg-gray-200 hover:bg-gray-100 cursor-pointer w-6 rounded-full p-1'>
            <RiImageEditLine />
            <span className='absolute top-6 bg-green-300 text-green-900 text-[10px] p-2 font-bold rounded-bl-full rounded-tl-full rounded-br-full right-2 opacity-0 group-hover:opacity-80 transition-opacity duration-300'>Change CoverImage</span>
          </div>
        </div>

        <div className='flex justify-start ml-40 sm:ml-50'>
          <div className='items-center absolute w-30 md:w-40 md:h-40 h-30 rounded-full top-60 left-6'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdyTh5ljvubR6s3LeERqK8DHldWwD3DcwBLw&s" alt="coverImage" className='rounded-full w-30 md:w-40 md:h-40 h-30' />
          </div>
          <div className='absolute left-30 top-80 md:top-90 md:left-38 group bg-gray-200 hover:bg-gray-100 cursor-pointer w-7 rounded-full p-1'>
            <RiImageEditLine />
            <span className='absolute top-6 left-3 bg-green-300 text-green-900 text-[10px] p-2 font-bold rounded-bl-full w-20 rounded-br-full rounded-tr-full right-2 opacity-0 group-hover:opacity-80 transition-opacity duration-300'>Change ProfilePicture</span>
          </div>

          <div>
            <h1 className='font-bold text-2xl '>Monkieee</h1>
            <div className='flex flex-col sm:flex-row items-center justify-center sm:gap-5'>
              <h2 className='font-medium text-gray-400 md:text-[15px]'>@Monkieee</h2>
              <hr className='text-green-800 w-2'/>
              <h3 className='text-green-900 font-medium text-[15px]'>Subscribers: 300</h3>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-7 sm:mt-20 flex justify-evenly items-center overflow-x-hidden'>
      {["Videos", "Playlists", "Tweets", "Channel Stats"].map((tab) => (
          <h1
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer text-[12px] sm:text-lg font-semibold px-4 py-1 transition-all ${
              activeTab === tab ? "text-green-700 border-b-2 border-green-700" : "text-gray-500"
            }`}
          >
            {tab}
          </h1>
        ))}
      </div>

      <div className='absolute mt-6 p-4 h-[600px] sm:h-[500px] grid grid-cols-1 lg:grid-cols-4 gap-3 overflow-y-scroll'>
        {activeTab === "Videos" && <UserVideos />}
        {activeTab === "Playlists" && <UserPlaylist />}
        {activeTab === "Tweets" && <UserTweets />}
        {activeTab === "Channel Stats" && <ChannelStats />}
      </div>

    </div>
  )
}

export default Profile
