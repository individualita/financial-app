import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchData } from "../services/fetchApi";
import { STATUSES } from "../constants/statuses";



const initialState = {
    currency: null,
    currencyLoadingStatus: STATUSES.IDLE, // IDLE | PENDING | FULFILLED | REJECTED
};


export const fetchCurrency = createAsyncThunk('currency/fetchCurrency', async (_, thunkAPI) => {

    try {
        
        //call the universal fetchData
        const data = await fetchData('https://www.cbr-xml-daily.ru/daily_json.js');
        return data;

    } catch (error) {
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

