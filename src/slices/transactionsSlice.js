import { createSlice } from "@reduxjs/toolkit";

//data
import {transactionsData} from "../data/transactionsData";



const initialState = {
    transactions: JSON.parse(localStorage.getItem('transactions')) || transactionsData
}

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers : {

    }
})


const {actions, reducer} = transactionsSlice;

export default reducer;