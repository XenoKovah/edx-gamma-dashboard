import { renderHook } from '@testing-library/react-hooks';
import { cleanup } from '@testing-library/react';
import DataUseStatusesBlock from './__mock__/DataUseStatusesBlock.json';
import { useStatusesBlock } from '../statusesBlock/useStatusesBlock';

afterEach(cleanup);

describe('getProgressTrackStyles returns expected styles', () => {

  beforeEach(() => {
    cleanup();
  });

  it.each(DataUseStatusesBlock)('checking different cases', ({ statusItems, index, expectResult }) => {
    const { result } = renderHook(() => useStatusesBlock({ statusItems }));
    const styles = result.current.getProgressTrackStyles(index);

    expect(styles.badgeStyles.filter).toBe(expectResult.filter);
    expect(styles.badgeStyles.opacity).toBe(expectResult.opacity);
    expect(styles.progressTrackStyles.width).toBe(expectResult.width);
    expect(styles.progressTrackEndStyles.display).toBe(expectResult.display);
  });
});
