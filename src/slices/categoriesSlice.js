import { createSlice } from "@reduxjs/toolkit";

import { DEFAULT_CATEGORIES } from "../constants/defaultCategories";


const initialState = {
    categories: JSON.parse(localStorage.getItem('categories')) || DEFAULT_CATEGORIES,
}


const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addNewCategory: (state, action) => {
            state.categories = {...state.categories, ...action.payload}
        }
    }
});

const {actions, reducer} = categoriesSlice;

export default reducer;

export const {addNewCategory} = actions;
