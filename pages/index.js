import Head from 'next/head';
import styled from 'styled-components';
import Button from '@mui/material/Button'

const P = styled.p`  
  color: ${
    ({ theme, useContrastText }) => useContrastText ? theme.palette.primary.contrastText : theme.palette.primary.main
  }
`;

const TestButton = styled(Button)`
  color: red;
`;


export default function Home() {
  return (
    <div>
      <Head>
        <title>Jailbreak</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to Jailbreak!
        </h1>

        <TestButton>Styled Component button (style override)</TestButton>

        <Button>Regular MUI button (inherits my custom theme)</Button>

        <P>Styled Component paragraph, inheriting a primary theme color</P>
        <P useContrastText={true}>Styled Component paragraph with <strong>useContrastText prop</strong></P>

      </main>

      <footer>
        
      </footer>
    </div>
  )
}
