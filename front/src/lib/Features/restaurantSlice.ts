'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialStateType {
  restaurantId: number;
  tiquetId: number;
  categoriaId: number;
  productesCategoriaVisualitzada: number[];
  producteId: number;
  tiquetIndividual: any[];
}

const initialState: InitialStateType = {
  restaurantId: 1,
  tiquetId: 1,
  categoriaId: 0,
  productesCategoriaVisualitzada: [],
  producteId: 0,
  tiquetIndividual: []
}

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurantId(state, action: PayloadAction<number>) {
      state.restaurantId = action.payload;
    },
    setTiquetId(state, action: PayloadAction<number>) {
      state.tiquetId = action.payload;
    },
    setCategoriaId(state, action: PayloadAction<number>) {
      state.categoriaId = action.payload;
    },
    setProductesCategoriaVisualitzada(state, action: PayloadAction<number[]>) {
      state.productesCategoriaVisualitzada = action.payload;
    },
    setProducteId(state, action: PayloadAction<number>) {
      state.producteId = action.payload;
    },
    setTiquetIndividual(state, action: PayloadAction<object[]>) {
      state.tiquetIndividual.push(...action.payload);
    },
  },
});

export const { setRestaurantId, setCategoriaId, setProductesCategoriaVisualitzada, setProducteId, setTiquetIndividual } = restaurantSlice.actions;
export default restaurantSlice.reducer;