import { renderHook, act } from '@testing-library/react-hooks';
import {
  intersectionMockInstance,
  mockIsIntersecting,
} from 'react-intersection-observer/test-utils';

import useInfiniteScroll from './';

describe('useInfiniteScroll', () => {
  let hook;
  let scrollerNode = document.createElement('div');
  let loaderNode = document.createElement('div');

  beforeEach(async () => {
    hook = renderHook(({ hasMore }) => useInfiniteScroll({ hasMore }), {
      initialProps: { hasMore: false },
    });
    const [, loaderRef, scrollerRef] = hook.result.current;
    loaderRef.current = loaderNode;
    scrollerRef.current = scrollerNode;

    hook.rerender({ hasMore: true });
  });

  it('first page should be 0', () => {
    const [page] = hook.result.current;
    expect(page).toBe(0);
  });

  it('should observe the loader node', () => {
    const observer = intersectionMockInstance(loaderNode);
    expect(observer).toBeDefined();
    expect(observer.observe).toHaveBeenCalledWith(loaderNode);
  });

  it('should switch to next page when reaching loaderNode intersection', () => {
    act(() => mockIsIntersecting(loaderNode, true));
    const [page] = hook.result.current;
    expect(page).toBe(1);
  });

  it('should disconnect when there are no more results', () => {
    const observer = intersectionMockInstance(loaderNode);
    expect(observer.disconnect).not.toHaveBeenCalled();

    hook.rerender({ hasMore: false });
    expect(observer.disconnect).toHaveBeenCalled();
  });
});
