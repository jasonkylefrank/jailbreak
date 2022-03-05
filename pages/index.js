import styled from 'styled-components';
import WelcomeLogIn from '../components/WelcomeLogIn';


//#region --- Styled Components ---
const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; ${'' /* So that it takes up all remaining space */}
`;
//#endregion --- end Styled Components ---



export default function Home() {

  return (
    <Page>

        <WelcomeLogIn />

    </Page>
  )
}
