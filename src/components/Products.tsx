import styled from 'styled-components';

import icons from '../assets/icons';

import type { Product } from '../types/types';

type ProductsProps = {
  products: Product[];
};

export default function Products({ products }: ProductsProps) {
  return (
    <Container>
      {products.map((product) => (
        <StyledProduct key={product.id}>
          <Thumbnail>
            <img src={product.thumbnail} alt={product.title} />
          </Thumbnail>

          <PriceAndRating>
            <Price>${product.price}</Price>
            <Rating>
              {icons.star} {product.rating}
            </Rating>
          </PriceAndRating>

          <Title>{product.title}</Title>
        </StyledProduct>
      ))}
    </Container>
  );
}

const Container = styled.section`
  padding: 1em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;

  @media (width < 40em) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (width < 30em) {
    font-size: 0.8rem;
  }
`;

const StyledProduct = styled.div`
  padding: 1em;
  border: 1px solid var(--border-color);
  border-radius: 0.5em;
`;

const Thumbnail = styled.div`
  aspect-ratio: 1;
`;

const PriceAndRating = styled.div`
  padding-top: 0.5em;
  display: flex;
  gap: 0.6em;
  align-items: center;

  @media (width < 23em) {
    flex-direction: column;
    align-items: start;
    gap: 0.4em;
  }
`;

const Price = styled.div`
  font-size: 1.3rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2em;
  font-size: 0.8rem;

  & > svg {
    opacity: 0.8;
    width: 0.9rem;
    flex-shrink: 0;
  }
`;

const Title = styled.div`
  padding-top: 0.5em;
`;
