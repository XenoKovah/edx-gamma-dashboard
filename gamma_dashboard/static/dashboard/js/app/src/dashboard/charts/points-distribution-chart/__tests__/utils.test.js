import { prepareEvents } from '../utils';

describe('prepareEvents', () => {
  it('drops negative slices so the pie still renders', () => {
    const result = prepareEvents({
      a: { title: 'Videos', points: 10 },
      b: { title: 'Penalty', points: -5 },
    });
    expect(result).toEqual([{ name: 'Videos', value: 10 }]);
  });
});
