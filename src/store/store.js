import { configureStore } from '@reduxjs/toolkit';

import plansReducer from '../slices/plansSlice';
import currencyReducer from '../slices/currencySlice';
import transactionsReducer from '../slices/transactionsSlice';

export const store = configureStore({
    reducer: {
        plansReducer, 
        currencyReducer,
        transactionsReducer
    },
    devTools: process.env.NODE_ENV !== 'production',// Включаем DevTools в dev режиме
});

