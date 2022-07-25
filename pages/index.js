import styled from 'styled-components';
import WelcomeLogIn from '../components/WelcomeLogIn';


//#region --- Styled Components ---
const Page = styled.div`
  display: flex;
  flex-direction: column;
  /* Take up all remaining space */
  flex: 1;
  
  /* Dreamin' about the Keys... */
  background-color: rgba(0 226 236 / 20%);
`;
//#endregion --- end Styled Components ---



export default function Home() {

  return (
    <Page>

        <WelcomeLogIn />        
    </Page>
  )
}
