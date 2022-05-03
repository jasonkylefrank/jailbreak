import Head from 'next/head';
import styled from "styled-components";
import PageHeader from './PageHeader';
import RenderOnClientOnly from './RenderOnClientOnly';
import EmulationNotice from './EmulationNotice';
import { emulatedFirebaseServices } from '../lib/firebase';


//#region --- Styled Components ---
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 16px;
  ${'' /* So that it takes up all remaining space */}
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

//#endregion --- end styled components ---

export default function Layout({ children }) {
  // TODO: Consider implementing a logged-in check here (observing the userAuth available in a 
  //         React context) which would redirect a non-logged-in user who is trying to access
  //         a page that requires being logged in to a login page.
  //       I could probably use the Next.js router to do a "router.push('/Login')" here in this
  //         file to accomplish that.  See this part of a video which shows how to implement 
  //         "protected routes", where he does something similar: https://youtu.be/DHZSYYTCTbA?t=123
  //       Similarly, if the user is logged-in, then the Login page should redirect to a different page.
  //       Side note about his technique compared to mine: Unlike his situation, my *data* will be 
  //         protected from reaching the front-end via Firestore security rules (so I don't need to do 
  //         the backend _middleware.js check that he does).

  return (
    <Wrapper>
      <Head>
        <title>Jailbreak!</title>
        <link rel="icon" href="/favicon.ico" />    
        {/* Also see stuff put in a <Head> element in the _document.js file (such as fonts, which Next.js won't let me put here)     */}
      </Head>

      <PageHeader />

      <Main>
        { children }
      </Main>

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
