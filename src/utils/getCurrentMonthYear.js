export const getCurrentMonthYear = () => {
    const currentYear = new Date().getFullYear();
    const currentMonthName = new Date().toLocaleString('en-US', { month: 'long' });

    return `${currentMonthName} ${currentYear}`;
}