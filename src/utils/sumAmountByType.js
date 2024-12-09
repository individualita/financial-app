const sumAmountByType  = (data, type) => {
    return data.reduce((sum, currentTransaction) => {
        return currentTransaction.amountType === type ? sum + Number(currentTransaction.amount) : sum;

    }, 0);
}

export default sumAmountByType;