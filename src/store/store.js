import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import profileReducer from './profileSlice';
import itemReducer from './itemSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    item: itemReducer,
    profile: profileReducer,
  },
});

export default store;
