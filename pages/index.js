import Head from 'next/head';
import styled from 'styled-components';
import PageHeader from '../components/PageHeader';
import WelcomeLogIn from '../components/WelcomeLogIn';


const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  padding: 16px;
  flex: 1;
  
`;

const Footer = styled.footer`
  height: 48px;
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

        <WelcomeLogIn />

        
      </Main>

      <Footer>
        Powered by D3.js, Next.js, Styled Components, MUI v5, and Firebase technologies
      </Footer>
    </Page>
  )
}
