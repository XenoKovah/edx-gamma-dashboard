import { renderHook } from '@testing-library/react-hooks';
import { cleanup } from '@testing-library/react';
import { useSliderStatusesBlock } from '../slider-statuses-block/hooks';
import DataForTestsCurrentIndex from './__mock__/DataForTestsCurrentIndex.json';
import DataUseSliderStatusesBlock from './__mock__/DataUseSliderStatusesBlock.json';

afterEach(cleanup);

describe('getProgressTrackStyles', () => {
  beforeEach(() => {
    cleanup();
  });

  it.each(DataUseSliderStatusesBlock)('getProgressTrackStyles returns expected styles', ({ statusItems, index, expectResult }) => {
    const { result } = renderHook(() => useSliderStatusesBlock({ statusItems }));
    const styles = result.current.getProgressTrackStyles(index, statusItems);

    expect(styles.badgeStyles.filter).toBe(expectResult.filter);
    expect(styles.badgeStyles.opacity).toBe(expectResult.opacity);
    expect(styles.progressTrackStyles.width).toBe(expectResult.width);
    expect(styles.progressTrackEndStyles.display).toBe(expectResult.display);
  });
});

describe('calculateCurrentIndex', () => {
  beforeEach(() => {
    cleanup();
  });

  it.each(DataForTestsCurrentIndex)('calculateCurrentIndex returns expected index', ({ statusItems, expectResult }) => {
    const { result } = renderHook(() => useSliderStatusesBlock({ statusItems }));
    const receivedIndex = result.current.calculateCurrentIndex(statusItems);

    expect(receivedIndex).toBe(expectResult.currentIndex);
  });
});
