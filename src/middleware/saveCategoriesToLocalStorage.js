export const saveCategoriesToLocalStorage = (store) => (next) => (action) => {

    const result = next(action);

    const {categories} = store.getState().categoriesReducer;
    localStorage.setItem('categories', JSON.stringify(categories));

    return result;

}