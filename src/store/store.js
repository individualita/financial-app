import { configureStore } from '@reduxjs/toolkit';

import plansReducer from '../slices/plansSlice';
import currencyReducer from '../slices/currencySlice';
import transactionsReducer from '../slices/transactionsSlice';
import categoriesReducer from '../slices/categoriesSlice';
import categoryColorsReducer from '../slices/categoryColorsSlice';

import { savePlansToLocalStorage } from '../middleware/savePlansToLocalStorage';
import { saveTransactionsToLocalStorage } from '../middleware/saveTransactionsToLocalStorage';
import { saveCategoriesToLocalStorage } from '../middleware/saveCategoriesToLocalStorage';
import { saveCategoryColorsToLocalStorage } from '../middleware/saveCategoryColorsToLocalStorage';


export const store = configureStore({
    reducer: {
        plansReducer, 
        currencyReducer,
        transactionsReducer,
        categoriesReducer,
        categoryColorsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(saveTransactionsToLocalStorage).
            concat(savePlansToLocalStorage).
            concat(saveCategoriesToLocalStorage).
            concat(saveCategoryColorsToLocalStorage),

    devTools: process.env.NODE_ENV !== 'production',// Включаем DevTools в dev режиме
});

