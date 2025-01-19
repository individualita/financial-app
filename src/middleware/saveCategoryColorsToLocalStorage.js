export const saveCategoryColorsToLocalStorage = (store) => (next) => (action) => {

    const result = next(action);

    const {categoryColors} = store.getState().categoryColorsReducer;
    localStorage.setItem('categoryColors', JSON.stringify(categoryColors));

    return result;

}