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
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const response = await fetch(
          'https://dummyjson.com/products?select=id,thumbnail,price,rating,title'
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        const products = filterProducts(data.products);

        setProducts(products);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  function filterProducts(data: Product[]): Product[] {
    return data.filter((product) => !uglyProductsIds.has(product.id));
  }

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <FetchingError />;
  } else {
    return <Products products={products} />;
  }
}
