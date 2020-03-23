import { useRef, useState, useLayoutEffect } from 'react';

/**
 * An infinite scroller based on effects.
 * Every time the loader is `N`px to be shown, switch to a new page, load new items.
 *
 * @example
 * const [items, setItems] = useState([]);
 * const [hasMore, setHasMore] = useState(false);
 * const [page, loaderRef, scrollerRef] = useInfiniteScroll({ hasMore });
 *
 * useFetchEffect(async ({ signal }) => {
 *   const data = await myApiCall({ page }, { signal });
 *   setHasMore(data.hasMore);
 *   setItems(prev => [...prev, data.items]);
 * }, [page])
 *
 * return (
 *   <div ref={scrollerRef}>
 *     {items.map(item => <div key={item.id}>{item.name}</div>)}
 *     {hasMore && <div ref={loaderRef}>Loading…</div>}
 *   </div>
 * );
 * @param {Object} [options={}]
 * @param {boolean} options.hasMore The observer will disconnect when there are no more items to load.
 * @param {boolean} [options.reset=false] Pass true when you're re-fetching the list and want to resets the scroller to page 0.
 * @param {number} [options.distance=250] When scrolling, the distance in pixels from the bottom to switch the page.
 */
export default function useInfiniteScroll({
  hasMore,
  reset = false,
  distance = 250,
}) {
  const scrollContainerRef = useRef();
  const loaderRef = useRef();
  const [page, setPage] = useState(0);

  if (reset && page !== 0) {
    setPage(0);
  }

  useLayoutEffect(() => {
    const loaderNode = loaderRef.current;
    const scrollContainerNode = scrollContainerRef.current;
    if (!scrollContainerNode || !loaderNode || !hasMore) return;

    const options = {
      root: scrollContainerNode,
      rootMargin: `0px 0px ${distance}px 0px`,
    };

    let previousY;
    let previousRatio = 0;

    const listener = entries => {
      entries.forEach(
        ({ isIntersecting, intersectionRatio, boundingClientRect = {} }) => {
          const { y } = boundingClientRect;
          if (
            isIntersecting &&
            intersectionRatio >= previousRatio &&
            (!previousY || y < previousY)
          ) {
            setPage(page => page + 1);
          }
          previousY = y;
          previousRatio = intersectionRatio;
        },
      );
    };

    const observer = new IntersectionObserver(listener, options);
    observer.observe(loaderNode);

    return () => observer.disconnect();
  }, [hasMore, distance]);

  return [page, loaderRef, scrollContainerRef];
}
