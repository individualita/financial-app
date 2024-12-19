export const getDateDetails = (date = new Date()) => {
    const month = date.getMonth() + 1;
    const monthName = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    
    return {
        month,
        monthName,
        year,
        formattedKey: `${year}-${String(month).padStart(2, '0')}`,
        dateLabel: `${monthName} ${year}`,
    };
}