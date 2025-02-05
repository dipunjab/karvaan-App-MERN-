import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TweetForm = ({ closeForm }) => {
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState("")
  const navigate = useNavigate()

  const addTweet = async () => {
    try {
      setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_API_BACKEND}/tweets`, {
        content: content
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
    } catch (error) {
      setLoading(false)
      console.log(error.message);
    }
    finally {
      setLoading(false)
      setContent("")
      navigate("/tweets")
      closeForm()
    }
  }

  return (
    <div className='bg-gray-100 p-2 rounded-2xl w-[350px] md:w-[400px] lg:w-[500px]'>
      <h1 className='text-center font-semibold text-2xl text-green-900'>Publish Tweet</h1>
      <hr className='mt-2 mb-2 text-green-200 shadow-2xl' />
      <div className='lg:flex justify-center items-center p-3 lg:gap-5'>

        <div className='mt-2 flex md:flex-row flex-col'>
          <label htmlFor="description" className='text-[20px] font-semibold mr-3 text-green-950'>Content:</label>
          <textarea name="description" rows={5} cols={20} className='bg-white p-1 rounded-2xl ' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
      </div>
      <div className='flex justify-center items-center gap-20'>
        <button className='bg-green-600 hover:bg-green-400 cursor-pointer p-3 rounded-full font-bold shadow drop-shadow-lg shadow-green-800' onClick={addTweet}> {loading? "Pushing" : "Push it"}</button>
        <button className='bg-green-300 hover:bg-green-200 cursor-pointer p-3 rounded-full font-bold shadow drop-shadow-lg shadow-green-500' onClick={closeForm}>Cancel</button>
      </div>
    </div>
  )
}

export default TweetForm
