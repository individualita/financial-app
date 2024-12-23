export const groupExpensesByCategory = (data) => {
    return data.reduce((acc, currentTransaction) => {
        if (currentTransaction.amountType === 'expense') {
            
            const category = currentTransaction.category;
            // Ищем категорию в аккумуляторе, если нет - добавляем
            const existingCategory = acc.find(item => item.category === category);
    
            if (existingCategory) {
                existingCategory.amount += Math.abs(currentTransaction.amount);
            } else {
                
                acc.push({
                    ...currentTransaction,
                    category: category,
                    amount: Math.abs(currentTransaction.amount),
                });
            }
        }

        return acc;
        
    },[]);  
};

