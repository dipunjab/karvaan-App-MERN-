import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [
    {
      title: "Learning JavaScript Basics",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3uSKJZScFshYQPGEtoWyJN4p7Nd5InsfFhg&s",
      username: "CodeMaster",
      userpfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3uSKJZScFshYQPGEtoWyJN4p7Nd5InsfFhg&s",
      views: 10234,
      createdAt: "2025-01-15",
      likedBy: false,
      watched: false,
    },
    {
      title: "React for Beginners",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4wwdoizt5qcclZKiVnzf8NzV8TSIZGjHf8yiKza_bHt7lyW3c3FPiPtiwS6SGhVy8g54&usqp=CAU",
      username: "ReactGuru",
      userpfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4wwdoizt5qcclZKiVnzf8NzV8TSIZGjHf8yiKza_bHt7lyW3c3FPiPtiwS6SGhVy8g54&usqp=CAU",
      views: 20987,
      createdAt: "2025-01-10",
      likedBy: true,
      watched: false,
    },
    {
      title: "CSS Flexbox Tutorial",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfdD1J_zoStf_KQUKdV-3fSQfrowVQ-OoAqQ&s",
      username: "DesignPro",
      userpfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfdD1J_zoStf_KQUKdV-3fSQfrowVQ-OoAqQ&s",
      views: 15432,
      createdAt: "2025-01-08",
      likedBy: true,
      watched: true,
    },
    {
      title: "Understanding TypeScript",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIySItGaY9pV64OSZVdYwiUchb5kXsHZJfRg&s",
      username: "TypeScriptNinja",
      userpfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIySItGaY9pV64OSZVdYwiUchb5kXsHZJfRg&s",
      views: 18765,
      createdAt: "2025-01-05",
      likedBy: false,
      watched: false,
    },
    {
      title: "Python for Data Science",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPnSZ94dMwe3wCw171vtBJYTqV-7kDc0PLDw&s",
      username: "DataScientist",
      userpfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPnSZ94dMwe3wCw171vtBJYTqV-7kDc0PLDw&s",
      views: 34521,
      createdAt: "2025-01-01",
      likedBy: true,
      watched: true,
    },
    {
      title: "Node.js Crash Course",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqbFc8QXV5LOLUtWKw42kI5NyPRNfTgjeANA&s",
      username: "BackendDev",
      userpfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqbFc8QXV5LOLUtWKw42kI5NyPRNfTgjeANA&s",
      views: 12098,
      createdAt: "2024-12-28",
      likedBy: false,
      watched: true,
    },
    {
      title: "Building REST APIs",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSONtw3jac2GSU-TPHVkDbXc41U4qeibvCxAQ&s",
      username: "APIMaster",
      userpfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSONtw3jac2GSU-TPHVkDbXc41U4qeibvCxAQ&s",
      views: 15387,
      createdAt: "2024-12-20",
      likedBy: true,
      watched: true,
    },
    {
      title: "Docker Essentials",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1E1VZZZASDNn67TPDgAghufbLq8xVlHLiw&s",
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
  },
});

export const { likedVideo, watchedVideo } = videoSlice.actions;

export default videoSlice.reducer;
