import { configureStore } from '@reduxjs/toolkit';

import plansReducer from '../slices/plansSlice';

export const store = configureStore({
    reducer: plansReducer,
    devTools: process.env.NODE_ENV !== 'production',// Включаем DevTools в dev режиме
});

