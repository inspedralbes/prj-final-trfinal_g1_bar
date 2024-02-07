'use client';

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: null,
        name: null,
        email: null,
        token: null,
    },
    reducers: {
        login: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.id = null;
            state.name = null;
            state.email = null;
            state.token = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;