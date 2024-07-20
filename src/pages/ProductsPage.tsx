import Products from '../components/Products';
import Loading from '../components/Loading';
import FetchingError from '../components/FetchingError';

import useProducts from '../hooks/useProducts.ts';

export default function ProductsPage() {
  const { products, currentPage, isLoading, error } = useProducts();

  if (isLoading && currentPage === 0) {
    return <Loading />;
  } else if (error) {
    return <FetchingError />;
  } else {
    return <Products products={products} />;
  }
}
