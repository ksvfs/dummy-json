import styles from './Products.module.scss';
import icons from '../assets/icons.tsx';

import { Product } from '../types/types.ts';

type ProductsProps = {
  products: Product[];
};

export default function Products({ products }: ProductsProps) {
  return (
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

          <div className={styles.title}>
            {product.id} {product.title}
          </div>
        </div>
      ))}
    </section>
  );
}
