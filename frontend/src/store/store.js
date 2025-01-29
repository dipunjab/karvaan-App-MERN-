import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice";
import videoSlice from "./videosSlice";
import tweetSlice from "./tweetsSlice"

const store = configureStore({
    reducer: {
        auth : authSlice,
        video: videoSlice,
        tweet: tweetSlice
    }
});

export default store