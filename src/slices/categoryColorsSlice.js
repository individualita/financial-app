import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_CATEGORY_COLORS } from "../constants/defaultCategoryColors";


const initialState = {
    categoryColors: JSON.parse(localStorage.getItem('categoryColors')) || DEFAULT_CATEGORY_COLORS 
}


const categoryColorsSlice = createSlice({
    name: 'categoryColors',
    initialState,
    reducers: {
        addNewColor: (state, action) => {
            state.categoryColors = {...state.categoryColors, ...action.payload}
        }
    }
});

const {actions, reducer} = categoryColorsSlice;

export default reducer;

export const {addNewColor} = actions;