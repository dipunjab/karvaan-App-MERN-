import React, { useEffect, useState } from 'react'
import ChannelCard from '../components/ChannelCard'
import { useSelector } from 'react-redux';
import axios from 'axios';

const Subscriptions = () => {
  const currentUser = useSelector((state) => state.auth.userData);
  const curUserId = currentUser?.userData?.data?._id

  const [subscribed, setSubscribed] = useState([])

  useEffect(() => {
    if(curUserId){
      (
        async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/subscriptions/u/${curUserId}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }

          });
          setSubscribed(response.data.data);
        } catch (error) {
          console.log("ERROR",error.status);
        }
      }
    )()
  }
  }, [curUserId])

  return (
    <div>
      <h1 className='ml-8 sm:ml-2 text-4xl text-gray-900 font-semibold'>Subscribed <span className='text-green-400'>Rahi's</span></h1>
      <div className='grid grid-cols-1 mt-16'>
        {subscribed.length > 0 ? subscribed.map((channel) => (
          <div key={channel._id}>
            <ChannelCard {...channel}/>
          </div>
        )): <>No Subscribed Channel</>
        }
      </div>
    </div>
  )
}

export default Subscriptions
