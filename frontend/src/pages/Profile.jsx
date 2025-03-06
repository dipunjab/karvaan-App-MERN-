import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from "../store/modalSlice";
import { RiImageEditLine } from "react-icons/ri";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  UserPlaylist,
  UserTweets,
  UserVideos,
  ChannelStats
} from "../components/ProfilePageComponents/index";
import { updateUserPFP, login, logout } from '../store/authSlice';
import lodainggif from "../assets/Loading.gif"

const Profile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const [loading, setLoading] = useState(null);
  const currentUser = useSelector((state) => state.auth.userData);
  const curUserId = currentUser?.userData?.data._id;
  let curruserpfp = currentUser?.userData?.data.avatar;

  const [userChannel, setUserChannel] = useState(false);
  const [isSubscribed, setSubscribed] = useState();
  const [activeTab, setActiveTab] = useState("Videos");

  // User details
  const [username, setUsername] = useState("");
  const [userpfp, setuserpfp] = useState("")
  const [coverImage, setCoverImage] = useState("");
  const [fullname, setFullname] = useState("");

  const [showPfpModal, setShowPfpModal] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);

  const [newPfp, setnewPfp] = useState(null);
  const [newCover, setnewCover] = useState(null);
  const [prePfp, setprePfp] = useState(null);
  const [preCover, setpreCover] = useState(null);

  const [totalSubscriber, setSub] = useState(0);

  useEffect(() => {
    dispatch(closeModal());
    if (userId) {
      (async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/users/userbyid/${userId}`);
          setUsername(response.data.data.username);
          setUserChannel(curUserId && userId === curUserId);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [currentUser, userpfp]);

  useEffect(() => {
    if (username) {
      (async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/users/c/${username}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
          });
          const data = response.data.data
          setFullname(data.fullname)
          setSub(data.subscribersCount)
          setuserpfp(data.avatar)
          console.log(data);
          
          setCoverImage(data.coverImage)

        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [username]);


  const handlePfpChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setnewPfp(file)
      setprePfp(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setnewCover(file)
      setpreCover(URL.createObjectURL(file));
    }
  };

  const refreshUserData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BACKEND}/users/current-user`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      dispatch(login({
        userData: response.data,
        accessToken: localStorage.getItem('accessToken')
      }));

    } catch (error) {
      dispatch(logout());
    }
  };


  const savePfp = async () => {
    if (!newPfp) return;
  
    const formData = new FormData();
    formData.append("avatar", newPfp);
  
    try {
      setLoading(true);
      const res = await axios.patch(`${import.meta.env.VITE_API_BACKEND}/users/update-avatar/`, formData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data"
        }
      });
  
      const updatedUser = res.data.data;
      
      setuserpfp(updatedUser.avatar);
  
      await refreshUserData();
  
      setShowPfpModal(false);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    } finally {
      setLoading(false);
      setnewPfp(null);
    }
  };
  

  // Save new Cover Image
  const saveCover = async () => {
    const formData = new FormData();
    formData.append("coverImage", newCover);

    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_BACKEND}/users/update-coverImage/`, formData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data"
        }
      });
      const updatedCover = res.data.data.coverImage;
      setCoverImage(updatedCover);
      setShowCoverModal(false);
    } catch (error) {
      console.error("Error updating cover image:", error);
    }
  };

  return (
    <div className='mt-6 sm:mt-1'>
      <div className='relative'>
        {/* Cover Image */}
        <div className='rounded-2xl shadow-sm shadow-green-200 w-full h-[270px]'>
          <img src={coverImage} alt="Cover" className='w-full h-[270px] rounded-2xl' />
          {userChannel && (
            <div className='absolute top-60 right-2 group bg-gray-200 hover:bg-gray-100 cursor-pointer w-6 rounded-full p-1' onClick={() => setShowCoverModal(true)}>
              <RiImageEditLine />
              <span className='absolute top-6 bg-green-300 text-green-900 text-[10px] p-2 font-bold rounded-bl-full rounded-tl-full rounded-br-full right-2 opacity-0 group-hover:opacity-80 transition-opacity duration-300'>Change Cover Image</span>
            </div>
          )}
        </div>

        {/* Profile Picture */}
        <div className='flex justify-start ml-40 sm:ml-50'>
          <div className='items-center absolute w-30 md:w-40 md:h-40 h-30 rounded-full top-60 left-6'>
            <img src={userpfp} alt="Profile" className='rounded-full w-30 md:w-40 md:h-40 h-30' />
          </div>
          {userChannel && (
            <div className='absolute left-30 top-80 md:top-90 md:left-38 group bg-gray-200 hover:bg-gray-100 cursor-pointer w-7 rounded-full p-1' onClick={() => setShowPfpModal(true)}>
              <RiImageEditLine />
              <span className='absolute top-6 left-3 bg-green-300 text-green-900 text-[10px] p-2 font-bold rounded-bl-full w-20 rounded-br-full rounded-tr-full right-2 opacity-0 group-hover:opacity-80 transition-opacity duration-300'>Change Profile Picture</span>
            </div>
          )}
          <div>
            <h1 className='font-bold text-2xl '>{fullname}</h1>
            <div className='flex flex-col md:flex-row items-center justify-center sm:gap-5'>
              <h2 className='font-medium text-gray-400 md:text-[15px]'>@{username}</h2>
              <hr className='text-green-800 w-2 md:block hidden' />
              <h3 className='text-green-900 font-medium text-[15px]'>Subscribers: {totalSubscriber}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-7 sm:mt-20 flex justify-between items-center overflow-x-hidden'>
        {["Videos", "Playlists", "Tweets", "Channel Stats"].map((tab) => (
          <h1
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer text-[12px] sm:text-[16px] font-semibold px-4 py-1 transition-all ${activeTab === tab ? "text-green-700 border-b-2 border-green-700" : "text-gray-500"
              }`}
          >
            {tab}
          </h1>
        ))}
      </div>

      <div className='absolute mt-6 p-5 h-[600px] sm:h-[500px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-x-hidden  overflow-y-auto'>
        {activeTab === "Videos" && <UserVideos userId={userId} />}
        {activeTab === "Playlists" && <UserPlaylist userId={userId} />}
        {activeTab === "Tweets" && <UserTweets userId={userId} />}
        {activeTab === "Channel Stats" && <ChannelStats userId={userId} />}
      </div>

      {/* PFP Modal */}
      {showPfpModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Change Profile Picture</h2>
            <img src={prePfp || userpfp} alt="Preview" className="w-32 h-32 rounded-full mb-4" />
            <input type="file" accept="image/*" className="mb-4" onChange={handlePfpChange} />
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg mr-2" onClick={savePfp}>Save</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={() => setShowPfpModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Cover Modal */}
      {showCoverModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Change Cover Image</h2>
            <img src={preCover || coverImage} alt="Preview" className="w-full h-40 rounded-lg mb-4" />
            <input type="file" accept="image/*" className="mb-4" onChange={handleCoverChange} />
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg mr-2" onClick={saveCover}>Save</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={() => setShowCoverModal(false)}>Close</button>
          </div>
        </div>
      )}

      {loading && (
        <div className='fixed top-[50%] left-[50%]'>
          <img src={lodainggif} className='md:w-40 w-20' />
        </div>
      )}
    </div>
  );
};

export default Profile;
