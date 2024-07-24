import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import Loading from '../components/Loading';
import Products from '../components/Products.tsx';
import FetchingError from '../components/FetchingError';
import NoSearchResults from '../components/NoSearchResults';

import fetchData from '../utils/fetchData.ts';
import styles from './ProductsPage.module.scss';
import icons from '../assets/icons.tsx';

import type { Product } from '../types/types.ts';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [canFetchMore, setCanFetchMore] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSearchResults, setShowSearchResults] = useState(false);

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
      setSearchParams({ search: searchText });
      setShowSearchResults(true);
    } else {
      if (!searchParams.has('search')) return;
      setSearchParams({});
      setProducts([]);
      setCurrentPage(0);
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
    if (searchParams.has('search')) return;

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

  function renderComponent() {
    if (isLoading && (currentPage === 0 || searchParams.has('search'))) {
      return <Loading />;
    } else if (error) {
      return <FetchingError />;
    } else if (showSearchResults && products.length === 0) {
      return <NoSearchResults />;
    } else {
      return <Products products={products} />;
    }
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

      {renderComponent()}
    </>
  );
}
