import styled from 'styled-components';

import icons from '../assets/icons';

export default function Loading() {
  return <Container>{icons.loading}</Container>;
}

const Container = styled.div`
  margin-top: calc(50dvh - 5rem);
  display: flex;
  justify-content: center;

  & > svg {
    height: 3rem;
    width: 3rem;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
