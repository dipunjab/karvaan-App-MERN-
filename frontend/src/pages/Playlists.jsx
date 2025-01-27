import React from 'react'
import PlaylistCard from '../components/PlaylistCard'

const Playlists = () => {
  return (
    <div>
      <h1 className='ml-8 sm:ml-2 text-4xl text-gray-900 font-bold underline underline-offset-4'>Playlists</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-6 ml-8 sm:ml-2">
            <PlaylistCard/>
            <PlaylistCard/>
            <PlaylistCard/>
            <PlaylistCard/>
            <PlaylistCard/>
            <PlaylistCard/>
            <PlaylistCard/>
        </div>
    </div>
  )
}

export default Playlists
