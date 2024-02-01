'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Features/counterSlice';
import getRestaurant from './Features/getRestaurant';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        restaurant: getRestaurant
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;