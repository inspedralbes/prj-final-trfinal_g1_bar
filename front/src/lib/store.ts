'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Features/counterSlice';
import restaurant from './Features/restaurantSlice';
import user from './Features/userSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        restaurant: restaurant,
        user: user,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;