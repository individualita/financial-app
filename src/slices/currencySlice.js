import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    currency: [],
    currencyLoadingStatus: 'idle', // idle | pending | fulfilled | rejected
};


const fetchCurrency = createAsyncThunk('currency/fetchCurrency', async () => {

    try {
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');

        if (!response.ok) {
            throw new Error(`Couldn't fetch ${url}, status ${response.status}`);
        }
    
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error : ${error}`);
        throw error;
    }

});

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrency.pending, (state) => {
                state.currencyLoadingStatus = 'pending';
            })
            .addCase(fetchCurrency.fulfilled, (state, action) => {
                state.currencyLoadingStatus = 'fulfilled';
                state.currency = action.payload;
            })
            .addCase(fetchCurrency.rejected, (state) => {
                state.currencyLoadingStatus = 'rejected';
            })
            .addDefaultCase(() => {})
    }
});