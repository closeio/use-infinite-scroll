import React, { useState, useEffect } from 'react';

import useInfiniteScroll from '@closeio/use-infinite-scroll';

import styles from './Example.module.css';

const URL = '//www.omdbapi.com/?s=beautiful&apikey=fb2d739d';

interface Item {
  imdbID: number;
  Year: number;
  Title: string;
  Poster: string;
}

const Example: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, loaderRef, scrollerRef] = useInfiniteScroll<
    HTMLDivElement,
    HTMLDivElement
  >({
    hasMore,
    distance: 300,
  });

  useEffect(() => {
    (async () => {
      const realPage = page + 1;
      const resp = await fetch(`${URL}&page=${realPage}`);
      const data = await resp.json();
      setHasMore(realPage * 10 <= data.totalResults);
      setItems((prev) => [...prev, ...data.Search]);
    })();
  }, [page]);

  return (
    <div ref={scrollerRef} className={styles.scroller}>
      {items.map((item) => (
        <section key={item.imdbID} className={styles.item}>
          <h3>
            {item.Year} – {item.Title}
          </h3>
          <img width="180px" alt={item.Title} src={item.Poster} />
        </section>
      ))}
      {hasMore && <div ref={loaderRef}>Loading…</div>}
    </div>
  );
};

export default Example;
