//Function to generate a random color from the color array
export const getRandomColor = (colors) => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};