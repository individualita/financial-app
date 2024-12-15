import { createSlice } from "@reduxjs/toolkit";

import plansData from "../data/plansData";

const initialState = {
    plans: JSON.parse(localStorage.getItem('plans')) || plansData,
}

const plansSlice = createSlice({
    name: 'plans',
    initialState,
    reducers: {
        addNewPlan: (state, action) => {
            state.plans.push(action.payload);
        },
        deletePlan: (state, action) => {
            state.plans = state.plans.filter(plan => plan._id !== action.payload);
        }
    }
});

const {actions, reducer} = plansSlice;

export default reducer;

export const {addNewPlan, deletePlan} = actions;