'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Features/counterSlice';
import getRestaurant from './Features/getRestaurant';
import user from './Features/userSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        restaurant: getRestaurant,
        user: user,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;