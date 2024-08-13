// slices/discountSlice.js
import { createSlice } from '@reduxjs/toolkit';

const discountSlice = createSlice({
  name: 'discount',
  initialState: 0,
  reducers: {
    applyDiscount(state, action) {
      return action.payload;
    },
  },
});

export const { applyDiscount } = discountSlice.actions;
export default discountSlice.reducer;
