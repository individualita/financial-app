export const savePlansToLocalStorage = (store) => (next) => (action) => {

    const result = next(action);

    const state = store.getState();
    const {plans} = state.plansReducer;
    localStorage.setItem('plans',JSON.stringify(plans));

    return result;
}