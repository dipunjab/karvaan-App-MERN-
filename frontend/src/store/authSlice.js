import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    accessToken: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload
            state.accessToken = action.payload
        },
        logout: (state) => {
            state.status = false
            state.userData = null
            state.accessToken = null
        },
        updateUserPFP: (state, action) => {
            if (state.userData) {
                state.userData = {
                    ...state.userData, 
                    data: { 
                        ...state.userData.data,
                        avatar: action.payload.avatar 
                    }
                };
            }
        }
    }
})

export const { login, logout, updateUserPFP } = authSlice.actions;

export default authSlice.reducer;