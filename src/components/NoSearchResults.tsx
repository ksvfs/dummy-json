import styled from 'styled-components';

import icons from '../assets/icons';

export default function NoSearchResults() {
  return (
    <Container>
      {icons.noSearchResults}
      Ничего не найдено
    </Container>
  );
}

const Container = styled.div`
  margin-top: calc(50dvh - 7rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;

  & > svg {
    height: 5rem;
    width: 5rem;
  }
`;
