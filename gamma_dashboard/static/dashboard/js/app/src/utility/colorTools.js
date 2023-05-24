const blackColor = 'rgb(51, 51, 51)';
const whiteColor = 'rgb(255, 255, 255)';

export const getRandomColors = () => {
    const colors = {
        backgroundColor: blackColor,
        fontColor: whiteColor
    };

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    const getContrastLevel = (r, g, b) => {
        return (Math.round(r * 299) + Math.round(g * 587) + Math.round(b * 114)) / 1000
    }

    const r = getRandomInt(255);
    const g = getRandomInt(255);
    const b = getRandomInt(255);

    const contrastLevel = getContrastLevel(r, g, b);

    colors.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    colors.fontColor = contrastLevel < 128 ? whiteColor : blackColor;

    return colors;
};
