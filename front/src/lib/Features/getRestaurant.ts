'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RestaurantIdState {
  restaurantId: number;
}

const initialState: RestaurantIdState = {
  restaurantId: 2,
};

export const restaurantIdSlice = createSlice({
  name: 'restaurantId',
  initialState,
  reducers: {
    setRestaurantId(state, action: PayloadAction<number>) {
      state.restaurantId = action.payload;
    },
  },
});

export const { setRestaurantId } = restaurantIdSlice.actions;
export default restaurantIdSlice.reducer;