// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import proposalReducer from './proposalSlice';
import serviceReducer from './serviceSlice'; 

const store = configureStore({
  reducer: {
    user: userReducer,
    proposal: proposalReducer,
    service: serviceReducer,
  },
});

export default store;
