import styled from 'styled-components';


const Container = styled.div`
  padding: 0 20px;
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const InlineLink = styled.a`
  color: ${({ theme }) => theme.palette.primary.main };

  :hover {
    text-decoration: underline;
  }
`;

export { Container, Main, InlineLink };