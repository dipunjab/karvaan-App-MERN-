import React, { useEffect, useState } from 'react'
import TweetsCard from '../components/TweetsCard'
import axios from 'axios'
import lodainggif from "../assets/Loading.gif"


const Tweets = () => {
  const [tweets, setTweets] = useState([])

  const [subscriptions, setSubscriptions] = useState({});  
  const [loading, setloading] = useState(false)

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const uniqueUserIds = [...new Set(tweets.map(tweet => tweet.owner))];
        const newSubscriptions = {};

        for (const userId of uniqueUserIds) {
          const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/subscriptions/status/c/${userId}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
          });
          newSubscriptions[userId] = response.data.data.isSubscribed;
        }

        setSubscriptions(newSubscriptions);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    fetchSubscriptions();
  }, [tweets]);

  const toggleSubscription = async (userId) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BACKEND}/subscriptions/c/${userId}`, {}, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      });

      setSubscriptions(prevSubs => ({
        ...prevSubs,
        [userId]: response.data.message === "Successfully subscribed the channel."
      }));
    } catch (error) {
      console.error('Error toggling subscription:', error);
    }
  };


const handletweetDeleted = (deletedtweetId) => {
    setTweets(tweets.filter(tweet => tweet._id !== deletedtweetId));
};

  useEffect(() => {
    ; (
      async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/tweets`, {
            headers: {
              Authorization: localStorage.getItem('accessToken')
            }
          })
          setTweets(response.data.data.tweets)
        } catch (error) {
        } 
      }
    )()
  }, [tweets])


  return (
    <div>
      <h1 className='text-2xl font-bold text-gray-600 underline'>Here’s What People Are Saying.</h1>
      <div className='grid grid-rows-1'>
        {tweets.length > 0 ? (
          tweets.map((tweet) => (
            <div key={tweet._id} >
              <TweetsCard tweet={tweet}
               isSubscribed={subscriptions[tweet.owner]}
               tweetDeleted={handletweetDeleted}
                toggleSubscription={() => toggleSubscription(tweet.owner)} />
            </div>
          ))) : null
        }
      </div>
      {loading && (
              <div className='fixed top-[50%] left-[50%]'>
                <img src={lodainggif} className='md:w-40 w-20' />
              </div>
            )}
    </div>
  )
}

export default Tweets
