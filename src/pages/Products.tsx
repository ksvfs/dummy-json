import { useState } from 'react';

import styles from './Products.module.scss';
import icons from '../assets/icons.tsx';

const data = [
  {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    price: 9.99,
    rating: 4.94,
    thumbnail:
      'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
  },
];

// prettier-ignore
const uglyProductsIds = new Set([
  6, 9, 19, 121, 122, 123, 125, 126, 127, 128, 131,
  132, 133, 134, 135, 136, 167, 168, 169, 170, 171,
]);

export default function Products() {
  const [products] = useState(getNormalProducts);

  function getNormalProducts() {
    return data.filter((product) => !uglyProductsIds.has(product.id));
  }

  return (
    <section className={styles.products}>
      {products.map((product) => (
        <div className={styles.product} key={product.id}>
          <img className={styles.thumbnail} src={product.thumbnail} alt={product.title} />
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
