import styled from 'styled-components';
import Layout from "../components/layout";
import WelcomeLogIn from '../components/welcomeLogIn';


//#region --- Styled Components ---
const Page = styled.div`
  display: flex;
  flex-direction: column;
  /* Take up all remaining space */
  flex: 1;
`;
//#endregion --- end Styled Components ---



export default function Index() {

  return (
    <Page>

        <WelcomeLogIn />        
    </Page>
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

