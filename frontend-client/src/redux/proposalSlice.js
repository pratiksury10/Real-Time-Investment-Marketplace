// src/redux/proposalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  proposals: [],
};

const proposalSlice = createSlice({
  name: 'proposal',
  initialState,
  reducers: {
    setProposals: (state, action) => {
      state.proposals = action.payload;
    },
    addProposal: (state, action) => {
      state.proposals.push(action.payload);
    },
  },
});

export const { setProposals, addProposal } = proposalSlice.actions;
export default proposalSlice.reducer;
