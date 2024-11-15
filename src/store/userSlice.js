// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  profile: null,
  username: '', // Username from localStorage
  password: '', // Password from localStorage
  errorMessage: '', // Error message for login failure
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');

      if (username === storedUsername && password === storedPassword) {
        state.isAuthenticated = true;
        state.errorMessage = '';
      } else {
        state.isAuthenticated = false;
        state.errorMessage = 'Invalid username or password';
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.profile = null;
    },
    signUp: (state, action) => {
      const { username, password, profile } = action.payload;
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      state.profile = profile;
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout, signUp } = userSlice.actions;
export default userSlice.reducer;
