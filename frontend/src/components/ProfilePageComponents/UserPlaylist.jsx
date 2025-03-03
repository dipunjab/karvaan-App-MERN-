import React, { useEffect, useState } from 'react'
import PlaylistCard from "../PlaylistCard"
import { useSelector } from 'react-redux'
import axios from 'axios'

const UserPlaylist = () => {

  const [userPlaylists, setUserPlaylists] = useState([])


  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const currentUser = useSelector((state) => state.auth.userData);
  const curUserId = currentUser?.userData?.data._id

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
  
  return (
    <>
      {userPlaylists.length > 0 ? 
        userPlaylists.map((playlist)=>(
          <div key={playlist._id}>
            <PlaylistCard {...playlist}/>
          </div>
        ))
      : <p>No Playlist found</p>}
    </>
  )
}

export default UserPlaylist
