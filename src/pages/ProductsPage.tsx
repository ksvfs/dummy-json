import { useState, useRef, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import Loading from '../components/Loading';
import Products from '../components/Products';
import FetchingError from '../components/FetchingError';
import NoSearchResults from '../components/NoSearchResults';

import fetchData from '../utils/fetchData';
import icons from '../assets/icons';

import type { Product } from '../types/types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [canFetchMore, setCanFetchMore] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const getSearchResults = useCallback(async (searchQuery: string) => {
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

  useEffect(
    function handleSearchParams() {
      const searchQuery = searchParams.get('search');

      if (!searchQuery && showSearchResults) {
        setShowSearchResults(false);
        setSearchText('');
        setProducts([]);
        setCurrentPage(0);
      } else if (searchQuery) {
        getSearchResults(searchQuery);
        setShowSearchResults(true);
        setSearchText(searchQuery);
      }
    },
    [searchParams, showSearchResults, getSearchResults]
  );

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

  useEffect(
    function handlePagination() {
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
    },
    [products, currentPage, canFetchMore, getNextPage, searchParams]
  );

  function onSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    searchInputRef.current?.blur();

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
      <SearchForm onSubmit={onSearchSubmit}>
        <SearchInput
          type="text"
          placeholder="Поиск товара (например, Apple)"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          ref={searchInputRef}
        />
        <SearchButton>{icons.search}</SearchButton>
      </SearchForm>

      {renderComponent()}
    </>
  );
}

const SearchForm = styled.form`
  margin-inline: 1em;
  display: flex;
`;

const SearchButton = styled.button`
  padding-inline: 0.5em;
  border: 1px solid var(--border-color);
  border-left: none;
  border-radius: 0 0.3em 0.3em 0;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.3em 0.5em;
  border: 1px solid var(--border-color);
  border-radius: 0.3em 0 0 0.3em;
  background-color: var(--mainBackgroundColor);

  &:focus {
    outline: none;
  }
`;
