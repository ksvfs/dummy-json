import icons from '../assets/icons';

import type { Product } from '../types/types';

type ProductsProps = {
  products: Product[];
};

export default function Products({ products }: ProductsProps) {
  return (
    <section>
      {products.map((product) => (
        <div key={product.id}>
          <div>
            <img src={product.thumbnail} alt={product.title} />
          </div>

          <div>
            <div>${product.price}</div>
            <div>
              {icons.star} {product.rating}
            </div>
          </div>

          <div>{product.title}</div>
        </div>
      ))}
    </section>
  );
}
