import React, { useEffect, useState } from 'react'
import PlaylistCard from '../components/PlaylistCard'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Playlists = () => {
  const [userPlaylists, setUserPlaylists] = useState([])


  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const currentUser = useSelector((state) => state.auth.userData);
  const curUserId = currentUser?.userData?.data._id

  const [model, setModel] = useState(false)
  const openModel = () => {
    setModel(true)
  }

  //getting playlists
  useEffect(() => {
    ; (
      async () => {
        try {
          setLoading(true)
          const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/playlist/user/${curUserId}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
          })
          setUserPlaylists(response.data.data);
          
        } catch (error) {
          setLoading(false)
        } finally {
          setLoading(false)
        }
      }
    )()
  }, [])
  //creating playlist
  const addPlaylist = async () => {
    try {
      setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_API_BACKEND}/playlist/`, {
        name: title,
        description: description
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      console.log(response);

    } catch (error) {
      setLoading(false)
    } finally {
      setLoading(false)
      setDescription("")
      setTitle("")
      setModel(false)
    }
  }

  return (
    <div>
      <div className=' flex justify-between'>
        <h1 className='text-4xl mt-4 text-gray-900 font-bold'>Playlists</h1>
        <button onClick={openModel} className='mr-20 md:w-32 w-28 h-10 mt-10 md:h-10 text-[10px] md:text-xs text-gray-900 font-bold border border-green-400 rounded-full bg-green-400 hover:bg-green-300 cursor-pointer'>Create Playlist</button>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-6 ml-8 sm:ml-2">
        {userPlaylists.length > 0 ? 
      userPlaylists.map((playlist) => (
        <div key={playlist._id}>
          <PlaylistCard {...playlist}/>
        </div>
      )) : "" 
      }
      </div>

      {model && (
        <div className='bg-gray-100 p-2 rounded-2xl w-[350px] md:w-[400px] lg:w-[500px] absolute top-50 md:right-50'>
          <h1 className='text-center font-semibold text-2xl text-green-900'>Add Playlist</h1>
          <hr className='mt-2 mb-2 text-green-200 shadow-2xl' />
          <div className='p-3 lg:gap-5'>
            <div className='mt-2 flex md:flex-row flex-col'>
              <label htmlFor="title" className='text-[20px] font-semibold mr-3 text-green-950'>Title:</label>
              <input name="title" rows={5} cols={20} className='bg-white p-1 rounded-2xl ' value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className='mt-2 flex md:flex-row flex-col'>
              <label htmlFor="description" className='text-[20px] font-semibold mr-3 text-green-950'>Description:</label>
              <input name="description" rows={5} cols={20} className='bg-white p-1 rounded-2xl ' value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>
          <div className='flex justify-center items-center gap-20'>
            <button className='bg-green-600 hover:bg-green-400 cursor-pointer p-3 rounded-full font-bold shadow drop-shadow-lg shadow-green-800' onClick={addPlaylist}> {loading ? "Pushing" : "Push it"}</button>
            <button className='bg-green-300 hover:bg-green-200 cursor-pointer p-3 rounded-full font-bold shadow drop-shadow-lg shadow-green-500' onClick={() => setModel(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Playlists
