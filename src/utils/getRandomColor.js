export const getRandomColor = () => {
    // 16777215 = FFFFFF (16-ричное)
    const randomInt = Math.floor(Math.random() * 16777215);
    const hexString = randomInt.toString(16).padStart(6, '0');
    return `#${hexString}`;
}