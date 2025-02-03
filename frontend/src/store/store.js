import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice";
import tweetSlice from "./tweetsSlice"
import modalSlice from "./modalSlice"

const store = configureStore({
    reducer: {
        auth : authSlice,
        tweet: tweetSlice,
        modal: modalSlice
    }
});

export default store