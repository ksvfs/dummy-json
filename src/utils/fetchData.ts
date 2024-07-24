import type { Product } from '../types/types.ts';

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

export default async function fetchData(request: string, abortController: AbortController) {
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
