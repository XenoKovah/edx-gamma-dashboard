import '@testing-library/jest-dom';
import { getRandomColors } from '../colorTools';

describe('function getRandomColors', () => {

    it('test returns different random colors on each call', () => {
        const color_1 = getRandomColors();
        const color_2 = getRandomColors();

        expect(color_1.backgroundColor).not.toEqual(color_2.backgroundColor);
    });

    // it('test fontColor depends on backgroundColor contrast level', () => {
    //     const getRandomColorsTest = getRandomColors;

    //     expect(getRandomColors.fontColor).toEqual('rgb(1, 1, 1)');
    // });
});
