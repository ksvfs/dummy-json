import styled from 'styled-components';

export default function NotFoundPage() {
  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <div>Страница не найдена</div>
    </Container>
  );
}

const Container = styled.section`
  margin-top: calc(50dvh - 10rem);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorCode = styled.div`
  font-size: 10rem;
  font-weight: bold;
`;
