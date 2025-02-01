import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch videos and enrich them with user data
export const fetchVideos = createAsyncThunk(
  "video/fetchVideos",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch all videos
      const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/videos`);
      const videos = response.data.data.videos;

      // Fetch user details for each video owner
      const enrichedVideos = await Promise.all(
        videos.map(async (video) => {
          try {
            const userResponse = await axios.get(
              `${import.meta.env.VITE_API_BACKEND}/users/userbyid/${video.owner}`
            );
            return {
              ...video,
              username: userResponse.data.data.username,
              userpfp: userResponse.data.data.profilePicture || "https://via.placeholder.com/40",
            };
          } catch (error) {
            console.error(`Failed to fetch user data for ${video.owner}:`, error);
            return {
              ...video,
              username: "Unknown User",
              userpfp: "https://via.placeholder.com/40",
            };
          }
        })
      );

      return enrichedVideos;
    } catch (error) {
      console.error("Error fetching videos:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch videos");
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videos: [],
    likedVideos: [],
    status: "idle", 
    error: null,
  },
  reducers: {
    toggleLike: (state, action) => {
      const video = state.videos.find((video) => video._id === action.payload);
      if (video) {
        video.likedBy = !video.likedBy;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { toggleLike } = videoSlice.actions;
export default videoSlice.reducer;
