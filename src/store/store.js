import { configureStore } from '@reduxjs/toolkit';

import plansReducer from '../slices/plansSlice';
import currencyReducer from '../slices/currencySlice';
import transactionsReducer from '../slices/transactionsSlice';

import { savePlansToLocalStorage } from '../middleware/savePlansToLocalStorage';
import { saveTransactionsToLocalStorage } from '../middleware/saveTransactionsToLocalStorage';


export const store = configureStore({
    reducer: {
        plansReducer, 
        currencyReducer,
        transactionsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(saveTransactionsToLocalStorage).concat(savePlansToLocalStorage),

    devTools: process.env.NODE_ENV !== 'production',// Включаем DevTools в dev режиме
});

