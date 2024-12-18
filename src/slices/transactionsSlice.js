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
        deleteTransaction: (state, action) => {
            state.transactions = state.transactions.filter(item => item._id !== action.payload);
        }
    }
})


const {actions, reducer} = transactionsSlice;

export default reducer;

export const {deleteTransaction} = actions;