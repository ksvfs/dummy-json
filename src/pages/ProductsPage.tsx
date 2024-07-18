import { useEffect, useState } from 'react';

import Products from '../components/Products';
import Loading from '../components/Loading';
import FetchingError from '../components/FetchingError';

import { Product } from '../types/types.ts';

// prettier-ignore
const uglyProductsIds = new Set([
  6, 9, 19, 121, 122, 123, 125, 126, 127, 128, 131,
  132, 133, 134, 135, 136, 167, 168, 169, 170, 171,
]);

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(false);
  const [canFetchMore, setCanFetchMore] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);

        const response = await fetch(
          'https://dummyjson.com/products?select=id,thumbnail,price,rating,title',
          { signal: abortController.signal }
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        const products = filterProducts(data.products);

        setProducts((prevProducts) => [...prevProducts, ...products]);
        setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
        setIsLoading(false);
      } catch {
        if (!abortController.signal.aborted) {
          setError(true);
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchMore() {
      if (!canFetchMore) return;

      try {
        setIsLoading(true);

        const response = await fetch(
          `https://dummyjson.com/products?select=id,thumbnail,price,rating,title&limit=30&skip=${
            currentPage * 30
          }`,
          { signal: abortController.signal }
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        const products = filterProducts(data.products);

        setProducts((prevProducts) => [...prevProducts, ...products]);
        setCanFetchMore((currentPage + 1) * 30 < data.total);
        setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
        setIsLoading(false);
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError(true);
          setIsLoading(false);
        }
      }
    }

    let fetchCalled = false;

    function handlePageEnd() {
      const pixelsLeft = document.body.scrollHeight - (window.scrollY + window.innerHeight);

      if (pixelsLeft < 500 && !fetchCalled) {
        fetchMore();
        fetchCalled = true;
      }
    }

    document.addEventListener('scroll', handlePageEnd);

    return () => {
      document.removeEventListener('scroll', handlePageEnd);
      abortController.abort();
    };
  }, [canFetchMore, currentPage]);

  function filterProducts(data: Product[]): Product[] {
    return data.filter((product) => !uglyProductsIds.has(product.id));
  }

  if (isLoading && currentPage === 0) {
    return <Loading />;
  } else if (error) {
    return <FetchingError />;
  } else {
    return <Products products={products} />;
  }
}
