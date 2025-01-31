import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice";
import videoSlice from "./videosSlice";
import tweetSlice from "./tweetsSlice"
import modalSlice from "./modalSlice"

const store = configureStore({
    reducer: {
        auth : authSlice,
        video: videoSlice,
        tweet: tweetSlice,
        modal: modalSlice
    }
});

export default store