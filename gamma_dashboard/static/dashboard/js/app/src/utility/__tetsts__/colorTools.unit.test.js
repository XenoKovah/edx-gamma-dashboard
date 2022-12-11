import '@testing-library/jest-dom';
import { getRandomColors } from '../colorTools';

describe('function getRandomColors', () => {
    it('test returns different random colors on each call', () => {
        // Ensure we don't break getRandomColors function
        // to return the same color on each call
        // Also we make it more robust to call it 100 times
        let arr = [];
        for (let i = 0; i < 100; i++) {
            arr.push(getRandomColors());
        }
        let uniqueColors = new Set(arr);
        expect(uniqueColors.size).not.toBe(1);
    });
});
