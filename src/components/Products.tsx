import icons from '../assets/icons';

import type { Product } from '../types/types';

type ProductsProps = {
  products: Product[];
};

export default function Products({ products }: ProductsProps) {
  return (
    <section className="grid grid-cols-2 gap-4 p-4 text-sm xs:text-base sm:grid-cols-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="rounded-lg border border-border-light p-4 dark:border-border-dark"
        >
          <div className="aspect-square">
            <img src={product.thumbnail} alt={product.title} />
          </div>

          <div className="xxs:flex-row xxs:items-center xxs:gap-[0.6rem] flex flex-col items-start gap-[0.4rem] pt-1">
            <div className="text-[1.3rem]">${product.price}</div>
            <div className="flex shrink-0 items-center gap-[0.2rem] text-[0.8rem] *:w-[0.9rem] *:opacity-80">
              {icons.star} {product.rating}
            </div>
          </div>

          <div className="pt-1 leading-5">{product.title}</div>
        </div>
      ))}
    </section>
  );
}
