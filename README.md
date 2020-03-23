# use-infinite-scroll

[![NPM](https://img.shields.io/npm/v/closeio_use-infinite-scroll.svg)](https://www.npmjs.com/package/use-infinite-scroll) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-success)](https://prettier.io)

Super simple React hook for creating an infinite scroll experience based on the `IntersectionObserver` API.

[Check the live DEMO](https://closeio.github.io/use-infinite-scroll/).

### <img height="40px" src="./close.svg" />

Interested in working on projects like this? [Close](https://close.com) is looking for [great engineers](https://jobs.close.com) to join our team!

## Install

```bash
yarn add @closeio/use-infinite-scroll
```

## Benefits

- Extremely lightweight (less than 1KB minzipped).
- It uses the `IntersectionObserver` API, so it doesn't need to listen to `scroll` events – which are known to cause performance issues.
- No other 3rd-party dependencies.

## Usage

```jsx
import React from 'react';
import useInfiniteScroll from '@closeio/use-infinite-scroll';

const [items, setItems] = useState([]);
const [hasMore, setHasMore] = useState(false);
const [page, loaderRef, scrollerRef] = useInfiniteScroll({ hasMore });

useEffect(async () => {
  const data = await myApiCall({ page });
  setHasMore(data.hasMore);
  setItems(prev => [...prev, data.items]);
}, [page]);

return (
  <div ref={scrollerRef}>
    {items.map(item => (
      <div key={item.id}>{item.name}</div>
    ))}
    {hasMore && <div ref={loaderRef}>Loading…</div>}
  </div>
);
```

## License

MIT © [Close](https://github.com/closeio)
