'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialStateType {
  restaurantId: number;
  tiquetId: number;
  codiQr: string;
  categoriaId: number;
  productesCategoriaVisualitzada: number[];
  producteId: number;
  tiquetIndividual: any[];
  tiquetTaula: any[];
  categories: any[];
  productes: any[];
  ingredients: any[];
}

const initialState: InitialStateType = {
  restaurantId: 0,
  tiquetId: 0,
  codiQr: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOCSURBVO3BQa5bRwADwe6B7n9lxossmM0Agp5+HIdV5hdm/naYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpLz6k8pOS8A6VloSm0pLwJJWflIRPHGbKYaYcZsqLhyXhSSq/E5WWhHck4UkqTzrMlMNMOcyUF1+m8o4kvEPlJgk3SfiESkvCO1TekYRvOsyUw0w5zJQX/3MqLQlN5f/kMFMOM+UwU178YZLwTUloKn+Sw0w5zJTDTHnxZUn4N6ncJKGp3Kg8KQm/k8NMOcyUw0x58TCV31kSmkpLQlNpSWgq71D5nR1mymGmHGaK+YX/MJWbJNyovCMJf7LDTDnMlMNMefEhlZaEpvKkJLQk3Ki0JLwjCU3lJglN5UlJ+KbDTDnMlMNMMb/wRSo3SWgqLQlNpSWhqbwjCU3lJglNpSXhRqUl4R0qLQlPOsyUw0w5zJQXvzmVb1J5h8qNSktCS8KNSkvCjUpLwicOM+UwUw4z5cXDVJ6UhKbyjiQ0lZskNJWWhKbyDpWbJNwkoak86TBTDjPlMFNefEjlJgk3Ki0JTeUdSXhSEm6S0FSaSktCU7lR+UmHmXKYKYeZ8uLLVFoSblRaEm5UWhJuktBUPqHSknCj0pLQVFoSmkpLwpMOM+UwUw4z5cXDktBUmkpLwo1KS8KNSkvCk1RaEm5UblQ+odKS8InDTDnMlMNMefHDktBUWhJaEm6S0FT+TSotCU3lJgk3SWgqTzrMlMNMOcyUF1+WhE+o3CShJaGptCR8IglN5UblEyotCS0JTzrMlMNMOcwU8wv/YSo3SWgqN0m4UblJwjtUbpLwkw4z5TBTDjPlxYdUflISWhKaSlN5UhKayo1KS8JNEprKO5LwicNMOcyUw0x58bAkPEnlRuUmCTcqTaUl4RNJeIdKS0JT+abDTDnMlMNMefFlKu9IwjepfELlRuUTSWgqLQlN5UmHmXKYKYeZ8uIPk4Sm0pLQVD6RhKZyk4Sm0lRuVL7pMFMOM+UwU17MPyShqbQkNJWWhHckoancJKGpPOkwUw4z5TBTXnxZEr4pCU3lHUm4SUJTeYfKJ5Lwkw4z5TBTDjPlxcNUfpJKS0JTaSrvSEJLwo3Kk1R+0mGmHGbKYaaYX5j522GmHGbKYaYcZsphphxmymGmHGbKYaYcZsphphxmymGmHGbKYab8BfRTdECvehmjAAAAAElFTkSuQmCC',
  categoriaId: 0,
  productesCategoriaVisualitzada: [],
  producteId: 0,
  tiquetIndividual: [],
  tiquetTaula: [],
  categories: [],
  productes: [],
  ingredients: [],
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
    setCodiQr(state, action: PayloadAction<string>) {
      state.codiQr = action.payload;
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
    addTiquetIndividual(state, action: PayloadAction<object[]>) {
      state.tiquetIndividual.push(...action.payload);
    },
    setTiquetIndividual(state, action: PayloadAction<object[]>) {
      state.tiquetIndividual = action.payload;
    },
    setTiquetTaula(state, action: PayloadAction<object[]>) {
      state.tiquetTaula = action.payload;
    },
    setCategories(state, action: PayloadAction<object[]>) {
      console.log("action.payload", action.payload);
      state.categories = action.payload;
    },
    setProductes(state, action: PayloadAction<object[]>) {
      state.productes = action.payload;
    },
    setIngredients(state, action: PayloadAction<object[]>) {
      state.ingredients = action.payload;
    },
  },
});

export const { setRestaurantId, setTiquetId, setCategoriaId, setProductesCategoriaVisualitzada, setProducteId, 
  addTiquetIndividual, setTiquetIndividual, setTiquetTaula, setCategories, setProductes, setIngredients } = restaurantSlice.actions;
export default restaurantSlice.reducer;