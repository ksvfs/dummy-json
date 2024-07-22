import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Loading from '../components/Loading';
import FetchingError from '../components/FetchingError';

import { Product } from '../types/types.ts';

import styles from './ProductsPage.module.scss';
import icons from '../assets/icons.tsx';

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
  const [searchText, setSearchText] = useState('');
  const [searchParams] = useSearchParams();
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchQuery = searchParams.get('search');

    if (!searchQuery && showSearchResults) {
      setShowSearchResults(false);
      setSearchText('');
      setProducts([]);
      setCurrentPage(0);
    } else if (searchQuery) {
      setShowSearchResults(true);
      setSearchText(searchQuery);
    }
  }, [searchParams, showSearchResults]);

  const getSearchResults = useCallback(async function getSearchResults(searchQuery: string) {
    setIsLoading(true);

    const abortController = new AbortController();

    const select = 'id,thumbnail,price,rating,title';

    const { newProducts } = await fetchData(
      `https://dummyjson.com/products/search?q=${searchQuery}&select=${select}`,
      abortController
    );

    if (newProducts) {
      setProducts(newProducts);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const search = searchParams.get('search');

    if (search) {
      getSearchResults(search);
    }
  }, [searchParams, getSearchResults]);

  function search(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (searchText.trim()) {
      navigate(`/products?search=${searchText}`);
      setShowSearchResults(true);
    } else {
      if (!searchParams.get('search')) return;
      navigate('/products');
      setProducts([]);
      setCurrentPage(0);
    }
  }

  async function fetchData(request: string, abortController: AbortController) {
    try {
      const response = await fetch(request, { signal: abortController.signal });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      const newProducts: Product[] = data.products.filter(
        (product: Product) => !uglyProductsIds.has(product.id)
      );
      const totalProducts: number = data.total;

      return { newProducts, totalProducts };
    } catch {
      return {};
    }
  }

  const getNextPage = useCallback(
    async (abortController: AbortController) => {
      if (!canFetchMore) return;

      setIsLoading(true);

      const select = 'id,thumbnail,price,rating,title';
      const limit = 30;
      const skip = currentPage * limit;

      const { newProducts, totalProducts } = await fetchData(
        `https://dummyjson.com/products?select=${select}&limit=${limit}&skip=${skip}`,
        abortController
      );

      if (newProducts) {
        setProducts([...products, ...newProducts]);
        setCanFetchMore((currentPage + 1) * limit < totalProducts);
        setCurrentPage(currentPage + 1);
        setIsLoading(false);
      } else {
        if (abortController.signal.aborted) return;
        setError(true);
        setIsLoading(false);
      }
    },
    [products, currentPage, canFetchMore]
  );

  useEffect(() => {
    if (searchParams.get('search')) return;

    const abortController = new AbortController();

    if (currentPage === 0) {
      getNextPage(abortController);
    }

    let fetchCalled = false;

    function handlePageEnd() {
      if (fetchCalled) return;

      const pixelsLeft = document.body.scrollHeight - (window.scrollY + window.innerHeight);

      if (pixelsLeft < 500) {
        getNextPage(abortController);
        fetchCalled = true;
      }
    }

    document.addEventListener('scroll', handlePageEnd);

    return () => {
      document.removeEventListener('scroll', handlePageEnd);
      abortController.abort();
    };
  }, [products, currentPage, canFetchMore, getNextPage, searchParams]);

  if (isLoading && (currentPage === 0 || searchParams.get('search'))) {
    return <Loading />;
  }

  if (error) {
    return <FetchingError />;
  }

  return (
    <>
      <form className={styles.searchForm} onSubmit={search}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Поиск товара (например, Apple)"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className={styles.searchButton}>{icons.search}</button>
      </form>

      <section className={styles.section}>
        {products.map((product) => (
          <div className={styles.product} key={product.id}>
            <div className={styles.thumbnail}>
              <img src={product.thumbnail} alt={product.title} />
            </div>

            <div className={styles.priceAndRating}>
              <div className={styles.price}>${product.price}</div>
              <div className={styles.rating}>
                {icons.star} {product.rating}
              </div>
            </div>

            <div className={styles.title}>{product.title}</div>
          </div>
        ))}
      </section>
    </>
  );
}
