import styled from 'styled-components';

import icons from '../assets/icons';

export default function FetchingError() {
  return (
    <Container>
      {icons.error}
      Ошибка получения данных
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
