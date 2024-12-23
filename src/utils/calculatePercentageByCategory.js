export const calculatePercetageByCategory = (categories, totalIncome) => {
    return categories.map(item => {
        return {
            ...item,
            percentage: totalIncome ? Number( ((item.amount / totalIncome) * 100 ).toFixed(1)) : 0
        };
    }).sort((a,b) => b.amount - a.amount); //сортировка по убыванию суммы
}

