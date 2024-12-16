import { configureStore } from '@reduxjs/toolkit';

import plansReducer from '../slices/plansSlice';
import currencyReducer from '../slices/currencySlice';

export const store = configureStore({
    reducer: {
        plansReducer, 
        currencyReducer
    },
    devTools: process.env.NODE_ENV !== 'production',// Включаем DevTools в dev режиме
});

