// import { createSlice } from '@reduxjs/toolkit'

// const tokenSlice = createSlice({
//     name: 'token',
//     initialState:{
//         token:null,
//         user:{}
//         },
//     reducers: {
//         setToken(state, action) {
//             state.token = action.payload.token
//             state.user=action.payload.user
//             console.log(state.user);
//         },
//         logOut(state, action) {
//             state.token = null;
//         }
//     }
// })

// export const { setToken, logOut } = tokenSlice.actions
// export default tokenSlice.reducer
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token); // Save token to local storage
    },
    logOut: (state) => {
       
            console.log("Before logout:", state);
            state.user = null;
            state.token = null;
            console.log("After logout:", state);
           localStorage.removeItem('token'); // Clear token from local storage
    },
  },
});

export const { setToken, logOut } = tokenSlice.actions;
export default tokenSlice.reducer;