import styled from 'styled-components';
import WelcomeLogIn from '../components/WelcomeLogIn';


//#region --- Styled Components ---
const Page = styled.div`
  display: flex;
  flex-direction: column;
  /* Take up all remaining space */
  flex: 1;
`;
//#endregion --- end Styled Components ---



export default function Home() {

  return (
    <Page>

        <WelcomeLogIn />        
    </Page>
  )
}
