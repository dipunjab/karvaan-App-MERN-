import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const VideoForm = ({ closeForm }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMSG, setErrorMSG] = useState(null);

  const [videoFile, setVideoFile] = useState(null)
  const [videoFileSize, setVideoFileSize] = useState("")
  const [thumbnail, setThumbnail] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  //This version of vercel can only handlle file upto 4.5mb so thats why we have to decrese the input file will work on to handle in different way
  

  // Handle VideoFile
  const handleVideoFile = (e) => {
    const file = e.target.files[0];
  if (file) {
    const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB
    if (fileSizeMB > 4.5) {
      setVideoFileSize("File size exceeds the 4.5MB limit. Please upload a smaller video.");
      setVideoFile(null)
      return;
    }
    setVideoFile(file)
  };
}

  // Handle cover image upload
  const handleThumbnail = (e) => {
    setThumbnail(e.target.files[0]);
  };


  const uploadVideo = async () => {
    try {
      if (!title || !description || !videoFile || !thumbnail) {
        setError(true);
        setErrorMSG("All fields are required!");
        return;
    }
      setLoading(true)
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("videoFile", videoFile);
      formData.append("thumbnail", thumbnail);
  
      const response = await axios.post(`${import.meta.env.VITE_API_BACKEND}/videos/`, 
        formData
      , {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(response)
    } catch (error) {
      console.log(error.message);
      setLoading(false)
    } finally{
      setLoading(false)
      navigate("/")
      setTitle("")
      setDescription("")
      setVideoFile(null)
      setThumbnail(null)
      closeForm()
    }
  }

  return (
    <div className='bg-gray-100 p-2 rounded-2xl w-[300px] md:w-[500px] lg:w-[800px]'>
      <h1 className='text-center font-semibold text-2xl text-green-900'>Upload Video</h1>
      <hr className='mt-2 mb-2 text-green-200 shadow-2xl' />

      <div className='lg:flex justify-center items-center p-3 lg:gap-5'>

        <div>
          {error && <p>{errorMSG}</p>}
          <div className='flex md:flex-row flex-col'>
            <label htmlFor="title" className='text-[20px] font-semibold mr-20 text-green-950'>Title:</label>
            <input type="text" placeholder='Title' className='bg-white p-1 rounded-xs ' value={title} name='title' onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className='mt-2 flex md:flex-row flex-col'>
            <label htmlFor="description" className='text-[20px] font-semibold mr-3 text-green-950'>Description:</label>
            <textarea name="description" rows={5} className='bg-white p-1 rounded-xs w-[220px]' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
        </div>

        <div className='mt-5 '>
          <div className='md:flex-row flex-col'>
            <label htmlFor="videoFile" className='text-[20px] font-semibold mr-10 text-green-950'>Video File</label>
             <p className='text-green-500 text-[8px]'>"File size should be less then 4.5MB</p> 
            <input type="file" accept="video/*" className='bg-white p-2 w-[250px] md:w-[300px]' value={videoFile} name='videoFile' onChange={handleVideoFile} />
            {videoFileSize.length > 0 && <p className='text-green-600'>{videoFileSize}</p>}
          </div>
          <div className='mt-3 md:flex-row flex-col'>
            <label htmlFor="thumbnail" className='text-[20px] font-semibold mr-8 text-green-950'>Thumbnail</label>
            <input type="file" accept="image/*" className='bg-white p-2 w-[250px] md:w-[300px]' value={thumbnail} name='thumbnail' onChange={handleThumbnail} />
          </div>
        </div>
      </div>

      <div className='flex justify-center items-center gap-20'>
        <button className='bg-green-600 hover:bg-green-400 cursor-pointer p-3 rounded-full font-bold shadow drop-shadow-lg shadow-green-800' onClick={uploadVideo}>{loading ? "Uploading...": "Upload"}</button>
        <button className='bg-green-300 hover:bg-green-200 cursor-pointer p-3 rounded-full font-bold shadow drop-shadow-lg shadow-green-500' onClick={closeForm}>Cancel</button>
      </div>

    </div>

  )
}

export default VideoForm
