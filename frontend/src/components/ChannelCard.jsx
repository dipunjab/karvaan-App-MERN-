import React, { useEffect, useState } from 'react'
import SubscribedButton from './SubscribedButton'
import { useSelector } from 'react-redux'
import axios from 'axios'


const ChannelCard = ({ _id, username, fullname, avatar }) => {    
    const [loading, setLoading] = useState(null)
    const authentication = useSelector((state) => state.auth.status);
    const [isSubscribed, setSubscribed] = useState()

    //get is Subscribed
    useEffect(() => {
        (
            async () => {
                try {
                    setLoading(true)
                    const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/subscriptions/status/c/${_id}`, {
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
    }, [_id])
    //for toggleing
    const toggleSubscription = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BACKEND}/subscriptions/c/${_id}`, {}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
           setSubscribed(prev => !prev);  

        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    //Total subs
    const [totalSubscriber , setSub] = useState(0)
    useEffect(()=>{
        ;(
            async()=>{
                try {
                    const res = await axios.get(`${import.meta.env.VITE_API_BACKEND}/subscriptions/c/${_id}`,
                        {
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                            }
                        });
                        setSub(res.data.data.length);
                } catch (error) {
                    console.log(error);
                }
            }
        )()
    },[isSubscribed])

    return (
        <div className='mt-4 p-2 bg-white shadow drop-shadow-sm shadow-green-100 rounded-full flex justify-between items-center'>
            <div className='flex justify-start items-center'>
                <div className='w-20 h-20 md:w-30 md:h-30 rounded-full'>
                    <img src={avatar} alt="" className='rounded-full' />
                </div>
                <div className='ml-2 text-start'>
                    <h2 className='text-[20px] font-semibold'>{fullname}</h2>
                    <p className='text-[12px] font-medium text-gray-500'>@{username}</p>
                    <p className='text-[10px] font-light text-gray-400'>Subscribers: {totalSubscriber}</p>
                </div>
            </div>
            <div onClick={toggleSubscription}>
                <SubscribedButton iSubscribed={isSubscribed} />
            </div>
        </div>
    )
}

export default ChannelCard
