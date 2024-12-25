export const saveTransactionsToLocalStorage = (store) => (next) => (action) => {

    // Вызываем next(action), чтобы пропустить экшен дальше по цепочке
    const result = next(action);

    
    // После того как редьюсер обработает экшен, получаем обновлённый стейт
    const state = store.getState();
    const { transactions } = state.transactionsReducer; 
    localStorage.setItem('transactions', JSON.stringify(transactions));

    return result;

}