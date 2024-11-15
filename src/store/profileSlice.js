import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    username: localStorage.getItem('username') || '',
    name: localStorage.getItem('name') || '',
    profileType: localStorage.getItem('profile') || '',
    profileImage: localStorage.getItem('profileImage') || '',
    description: localStorage.getItem('description') || '',
    address: localStorage.getItem('address') || '',
  },
  isAuthenticated: false,
  errorMessage: '',
};

const profileSlice = createSlice({
  name: 'profile',
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
    },
    updateProfile: (state, action) => {
      state.profile = action.payload;
      Object.entries(state.profile).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });
    },
  },
});

export const { login, logout, updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
