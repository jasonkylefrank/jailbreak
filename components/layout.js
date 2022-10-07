import Head from 'next/head';
import styled from "styled-components";
import { Container, Main } from "../components/_sharedStyles";
import PageHeader from './pageHeader';
import RenderOnClientOnly from './renderOnClientOnly';
import EmulationNotice from './emulationNotice';
import { emulatedFirebaseServices } from '../lib/firebase';


//#region --- Styled Components ---
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;


const Footer = styled.footer`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 24px;

  background-color: rgba(0,0,0,0.05);
  color: rgba(0,0,0,0.6);

  font-size: 11px;
  @media (min-width: 560px) {
    font-size: 13px;
  }
`;

//#endregion --- end styled components ---

export default function Layout({ children, title }) {
  const titleSuffix = 'Jailbreak!';
  const fullTitle = title ? `${title} • ${titleSuffix}` : titleSuffix;


  return (
    <Wrapper>
      <Head>
        <title>{fullTitle}</title>
        <link rel="icon" href="/favicon.svg" />    
        {/* Also see stuff put in a <Head> element in the _document.js file (such as fonts, which Next.js won't let me put here)     */}
      </Head>

      <PageHeader />

      <Container>
        <Main>
            {children}
        </Main>
      </Container>

      <Footer>
        Powered by D3.js, Next.js, Styled Components, MUI v5, and Firebase technologies
      </Footer>

      <RenderOnClientOnly>
        {
          emulatedFirebaseServices && <EmulationNotice />
        }
      </RenderOnClientOnly>
    </Wrapper>
  );
}
