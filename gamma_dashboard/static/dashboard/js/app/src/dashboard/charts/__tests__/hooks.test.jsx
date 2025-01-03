import { renderHook, act } from '@testing-library/react-hooks';

import { useElementWidth } from '../hooks';

const mockOffsetWidth = (value) => {
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    value,
  });
};

describe('useElementWidth', () => {
  let mockRef;

  beforeEach(() => {
    mockRef = { current: document.createElement('div') };
  });

  afterEach(() => {
    delete HTMLElement.prototype.offsetWidth;
  });

  it('should return the initial width of the element', () => {
    mockOffsetWidth(300);

    const { result } = renderHook(() => useElementWidth(mockRef));

    expect(result.current).toBe(300);
  });

  it('should update the width when the element resizes', () => {
    mockOffsetWidth(300);
    const { result } = renderHook(() => useElementWidth(mockRef));

    expect(result.current).toBe(300);

    act(() => {
      mockOffsetWidth(500);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(500);
  });

  it('should not update width if ref.current is null', () => {
    mockRef.current = null;
    const { result } = renderHook(() => useElementWidth(mockRef));

    expect(result.current).toBe(0);
  });

  it('should clean up the resize event listener on unmount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useElementWidth(mockRef));

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
