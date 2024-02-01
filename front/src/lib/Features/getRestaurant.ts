'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RestaurantIdState {
  //restaurantId: number;
  restaurant: object
}

const initialState: RestaurantIdState = {
  restaurant: {
    restaurantId: 2,
    categoriaId: null,
    productesCategoriaVisualitzada: [],
    producteId: null
  },
};

export const restaurantIdSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurantId(state, action: PayloadAction<number>) {
      state.restaurant.restaurantId = action.payload;
    },
    setCategoriaId(state, action: PayloadAction<number>) {
      state.restaurant.categoriaId = action.payload;
    },
    setProductesCategoriaVisualitzada(state, action: PayloadAction<number>) {
      state.restaurant.productesCategoriaVisualitzada = action.payload;
    },
    setProducteId(state, action: PayloadAction<number>) {
      state.restaurant.producteId = action.payload;
    },
  },
});

export const { setRestaurantId, setCategoriaId, setProductesCategoriaVisualitzada, setProducteId } = restaurantIdSlice.actions;
export default restaurantIdSlice.reducer;