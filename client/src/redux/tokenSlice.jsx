import { createSlice } from '@reduxjs/toolkit'

const tokenSlice = createSlice({
    name: 'token',
    initialState:{
        token:null,
        user:{}
        },
    reducers: {
        setToken(state, action) {
            state.token = action.payload.token
            state.user=action.payload.user
            console.log(state.user);
        },
        logOut(state, action) {
            state.token = null;
        }
    }
})

export const { setToken, logOut } = tokenSlice.actions
export default tokenSlice.reducer