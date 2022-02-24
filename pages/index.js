import Head from 'next/head';
import styled from 'styled-components';
import PageHeader from '../components/PageHeader';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const P = styled.p`  
  color: ${
    ({ theme, useContrastText }) => useContrastText ? theme.palette.primary.contrastText : theme.palette.primary.main
  }
`;

const TestButton = styled(Button)`
  color: red;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  padding: 16px;
  flex: 1;
  
  background: yellow;
`;

const Footer = styled.footer`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0,0,0,0.05);
  color: rgba(0,0,0,0.6);
  font-size: 13px;
`;

export default function Home() {
  return (
    <Page>
      <Head>
        <title>Jailbreak</title>
        <link rel="icon" href="/favicon.ico" />    
        {/* Also see stuff put in a <Head> element in the _document.js file (such as fonts, which Next.js won't let me put here)     */}
      </Head>

      <PageHeader />
      <Main>

        <TestButton>Styled Component button (style override)</TestButton>

        <Button>Regular MUI button (inherits my custom theme)</Button>

        <P>Styled Component paragraph, inheriting a primary theme color</P>
        <P useContrastText={true}>Styled Component paragraph with <strong>useContrastText prop</strong></P>

        <IconButton>
          <ExpandMoreIcon />
        </IconButton>
      </Main>

      <Footer>
        Powered by D3.js, Next.js, Styled Components, MUI v5, and Firebase technologies
      </Footer>
    </Page>
  )
}
