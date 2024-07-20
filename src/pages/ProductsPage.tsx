import { useState, useEffect } from 'react';

import Products from '../components/Products';
import Loading from '../components/Loading';
import FetchingError from '../components/FetchingError';

import { Product } from '../types/types.ts';

// prettier-ignore
const uglyProductsIds = new Set([
  6, 9, 19, 121, 122, 123, 125, 126, 127, 128, 131,
  132, 133, 134, 135, 136, 167, 168, 169, 170, 171,
]);

/*
  У некоторых фотографий в DummyJSON API есть чёрные полосы,
  которые ужасно выглядят в светлой теме.
  Я решил их просто отфильтровать.
  В реальных проектах обещаю не убирать с сайта товары
  просто потому, что мне не нравятся их фотографии.
*/

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [canFetchMore, setCanFetchMore] = useState(true);

  useEffect(() => {
    async function fetchData(abortController: AbortController) {
      if (!canFetchMore) return;

      try {
        setIsLoading(true);

        const select = 'id,thumbnail,price,rating,title';
        const limit = 30;
        const skip = currentPage * limit;

        const response = await fetch(
          `https://dummyjson.com/products?select=${select}&limit=${limit}&skip=${skip}`,
          { signal: abortController.signal }
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        const newProducts = data.products.filter(
          (product: Product) => !uglyProductsIds.has(product.id)
        );

        setProducts([...products, ...newProducts]);
        setCanFetchMore((currentPage + 1) * limit < data.total);
        setCurrentPage(currentPage + 1);
        setIsLoading(false);
      } catch {
        if (abortController.signal.aborted) return;
        setError(true);
        setIsLoading(false);
      }
    }

    const abortController = new AbortController();

    if (currentPage === 0) {
      fetchData(abortController);
    }

    let fetchCalled = false;

    function handlePageEnd() {
      if (fetchCalled) return;

      const pixelsLeft = document.body.scrollHeight - (window.scrollY + window.innerHeight);

      if (pixelsLeft < 500) {
        fetchData(abortController);
        fetchCalled = true;
      }
    }

    document.addEventListener('scroll', handlePageEnd);

    return () => {
      document.removeEventListener('scroll', handlePageEnd);
      abortController.abort();
    };
  }, [products, currentPage, canFetchMore]);

  if (isLoading && currentPage === 0) {
    return <Loading />;
  } else if (error) {
    return <FetchingError />;
  } else {
    return <Products products={products} />;
  }
}
