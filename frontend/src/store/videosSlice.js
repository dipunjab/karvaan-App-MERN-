import { createSlice } from "@reduxjs/toolkit";
import video1 from "../assets/video-1.mp4"

const initialState = {
  videos: [
    {
      id: "5435323423", 
      title: "Learning JavaScript Basics",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3uSKJZScFshYQPGEtoWyJN4p7Nd5InsfFhg&s",
      videoFile: video1,
      username: "CodeMaster",
      userpfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3uSKJZScFshYQPGEtoWyJN4p7Nd5InsfFhg&s",
      views: 10234,
      createdAt: "2025-01-15",
      likedBy: false,
      watched: false,
    },
    {
      id: "421324314334",  
      title: "React for Beginners",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4wwdoizt5qcclZKiVnzf8NzV8TSIZGjHf8yiKza_bHt7lyW3c3FPiPtiwS6SGhVy8g54&usqp=CAU",
      videoFile: video1,
      username: "ReactGuru",
      userpfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4wwdoizt5qcclZKiVnzf8NzV8TSIZGjHf8yiKza_bHt7lyW3c3FPiPtiwS6SGhVy8g54&usqp=CAU",
      views: 20987,
      createdAt: "2025-01-10",
      likedBy: true,
      watched: false,
    },
    {
      id: "51534134413",  
      title: "CSS Flexbox Tutorial",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfdD1J_zoStf_KQUKdV-3fSQfrowVQ-OoAqQ&s",
      videoFile: video1,
      username: "DesignPro",
      userpfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfdD1J_zoStf_KQUKdV-3fSQfrowVQ-OoAqQ&s",
      views: 15432,
      createdAt: "2025-01-08",
      likedBy: true,
      watched: true,
    },
    {
      id: "532544325",  
      title: "Understanding TypeScript",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIySItGaY9pV64OSZVdYwiUchb5kXsHZJfRg&s",
      videoFile: video1,
      username: "TypeScriptNinja",
      userpfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIySItGaY9pV64OSZVdYwiUchb5kXsHZJfRg&s",
      views: 18765,
      createdAt: "2025-01-05",
      likedBy: false,
      watched: false,
    },
    {
      id: "5213453245314",  
      title: "Python for Data Science",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPnSZ94dMwe3wCw171vtBJYTqV-7kDc0PLDw&s",
      videoFile: video1,
      username: "DataScientist",
      userpfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPnSZ94dMwe3wCw171vtBJYTqV-7kDc0PLDw&s",
      views: 34521,
      createdAt: "2025-01-01",
      likedBy: true,
      watched: true,
    },
    {
      id: "5123413242134",  
      title: "Node.js Crash Course",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqbFc8QXV5LOLUtWKw42kI5NyPRNfTgjeANA&s",
      videoFile: video1,
      username: "BackendDev",
      userpfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqbFc8QXV5LOLUtWKw42kI5NyPRNfTgjeANA&s",
      views: 12098,
      createdAt: "2024-12-28",
      likedBy: false,
      watched: true,
    },
    {
      id: "43353433141234",  
      title: "Building REST APIs",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSONtw3jac2GSU-TPHVkDbXc41U4qeibvCxAQ&s",
      videoFile: video1,
      username: "APIMaster",
      userpfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSONtw3jac2GSU-TPHVkDbXc41U4qeibvCxAQ&s",
      views: 15387,
      createdAt: "2024-12-20",
      likedBy: true,
      watched: true,
    },
    {
      id: "635432513424", 
      title: "Docker Essentials",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1E1VZZZASDNn67TPDgAghufbLq8xVlHLiw&s",
      videoFile: video1,
      username: "DevOpsExpert",
      userpfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1E1VZZZASDNn67TPDgAghufbLq8xVlHLiw&s",
      views: 21234,
      createdAt: "2024-12-18",
      likedBy: false,
      watched: false,
    }
  ],
  likedVideos: [], 
  watchedVideos: [], 
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    likedVideo: (state) => {
      state.likedVideos = state.videos.filter((video) => video.likedBy === true);
    },
    watchedVideo: (state) => {
      state.watchedVideos = state.videos.filter((video) => video.watched === true);
    },
    toggleLike: (state, action) => {
      const video = state.videos.find((video) => video.id === action.payload);
      if (video) {
        video.likedBy = !video.likedBy;
      }
    },
  },
});

export const { likedVideo, watchedVideo, toggleLike } = videoSlice.actions;

export default videoSlice.reducer;
