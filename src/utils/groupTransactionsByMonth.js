export const groupTransactionsByMonth = (transactions) => {
    return transactions.reduce((acc,item) => {

        // Extract the month name from the transaction date
        const date = new Date(item.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        
        const key = `${year}-${String(month).padStart(2, '0')}`;

        // If the month is not yet a key in the accumulator, create it with an empty array
        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(item);

        return acc;

    }, {});
}

