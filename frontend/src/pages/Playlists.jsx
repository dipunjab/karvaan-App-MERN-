import React from 'react'
import PlaylistCard from '../components/PlaylistCard'

const Playlists = () => {
  return (
    <div>
      <h1 className='ml-8 sm:ml-2 text-4xl text-gray-900 font-bold'>Playlists (UnderWorking)</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-6 ml-8 sm:ml-2">
            <PlaylistCard/>
        </div>
    </div>
  )
}

export default Playlists
