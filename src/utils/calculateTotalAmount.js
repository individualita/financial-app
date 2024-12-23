export const calculateTotalAmount = (data) => {
    return data.reduce((sum, item) => {
        return sum + Number(item.amount);
    }, 0);
}

