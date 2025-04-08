// src/redux/serviceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedServices: [],
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    addService: (state, action) => {
      state.selectedServices.push(action.payload);
    },
    removeService: (state, action) => {
      state.selectedServices = state.selectedServices.filter(
        (service) => service.id !== action.payload
      );
    },
    resetServices: (state) => {
      state.selectedServices = [];
    },
  },
});

export const { addService, removeService, resetServices } = serviceSlice.actions;
export default serviceSlice.reducer;
