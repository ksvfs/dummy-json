import Loading from '../components/Loading';
import FetchingError from '../components/FetchingError';

import useProducts from '../hooks/useProducts.ts';

import styles from './ProductsPage.module.scss';
import icons from '../assets/icons.tsx';

export default function ProductsPage() {
  const { products, currentPage, isLoading, error } = useProducts();

  if (isLoading && currentPage === 0) {
    return <Loading />;
  }

  if (error) {
    return <FetchingError />;
  }

  return (
    <>
      <form className={styles.searchForm}>
        <input className={styles.searchInput} type="text" placeholder="Поиск товара" />
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
