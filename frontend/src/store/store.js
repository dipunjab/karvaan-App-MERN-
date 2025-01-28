import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice";
import videoSlice from "./videosSlice";


const store = configureStore({
    reducer: {
        auth : authSlice,
        video: videoSlice
    }
});

export default store