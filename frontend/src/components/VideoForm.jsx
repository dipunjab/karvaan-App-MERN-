import React from 'react'

const VideoForm = ({closeForm}) => {
  return (
    <div className='bg-gray-100 p-2 rounded-2xl w-[300px] md:w-[500px] lg:w-[800px]'>
      <h1 className='text-center font-semibold text-2xl text-green-900'>Upload Video</h1>
      <hr className='mt-2 mb-2 text-green-200 shadow-2xl' />

      <div className='lg:flex justify-center items-center p-3 lg:gap-5'>

        <div>
          <div className='flex md:flex-row flex-col'>
            <label htmlFor="title" className='text-[20px] font-semibold mr-20 text-green-950'>Title:</label>
            <input type="text" placeholder='Title' className='bg-white p-1 rounded-xs '/>
          </div>
          <div className='mt-2 flex md:flex-row flex-col'>
            <label htmlFor="description" className='text-[20px] font-semibold mr-3 text-green-950'>Description:</label>
            <textarea name="description" rows={5} className='bg-white p-1 rounded-xs w-[220px]'></textarea>
          </div>
        </div>

        <div className='mt-5 '>
        <div className='md:flex-row flex-col'>
          <label htmlFor="videoFile" className='text-[20px] font-semibold mr-10 text-green-950'>Video File</label>
          <input type="file"  accept="video/*" className='bg-white p-2 w-[250px] md:w-[300px]'/>
        </div>
        <div className='mt-3 md:flex-row flex-col'>
          <label htmlFor="thumbnail" className='text-[20px] font-semibold mr-8 text-green-950'>Thumbnail</label>
          <input type="file" accept="image/*" className='bg-white p-2 w-[250px] md:w-[300px]' />
        </div>
      </div>
      </div>

    <div className='flex justify-center items-center gap-20'>
      <button className='bg-green-600 hover:bg-green-400 cursor-pointer p-3 rounded-full font-bold shadow drop-shadow-lg shadow-green-800'>Upload</button>
      <button className='bg-green-300 hover:bg-green-200 cursor-pointer p-3 rounded-full font-bold shadow drop-shadow-lg shadow-green-500' onClick={closeForm}>Cancel</button>
    </div>

    </div>

  )
}

export default VideoForm
