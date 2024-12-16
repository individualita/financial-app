import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { STATUSES } from "../constants/statuses";



const initialState = {
    currency: null,
    currencyLoadingStatus: STATUSES.IDLE, // IDLE | PENDING | FULFILLED | REJECTED
};


export const fetchCurrency = createAsyncThunk('currency/fetchCurrency', async (_, thunkAPI) => {

    try {
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');

        if (!response.ok) {
            throw new Error(`Couldn't fetch ${url}, status ${response.status}`);
        }
    
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error : ${error}`);
        return thunkAPI.rejectWithValue(error.message); // Возвращаем ошибку в Redux
        
    }

});

const currencySlice = createSlice({
    name: 'currency',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrency.pending, (state) => {
                state.currencyLoadingStatus = STATUSES.PENDING;
            })
            .addCase(fetchCurrency.fulfilled, (state, action) => {
                state.currencyLoadingStatus = STATUSES.FULFILLED;
                state.currency = action.payload;
            })
            .addCase(fetchCurrency.rejected, (state, action) => {
                state.currencyLoadingStatus = STATUSES.REJECTED;
                console.error(action.payload); // Логируем пользовательское сообщение

            })
            .addDefaultCase(() => {})
    }
});


const {actions, reducer} = currencySlice;

export default reducer;

