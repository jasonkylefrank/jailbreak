import Head from 'next/head';
import styled from 'styled-components';

const P = styled.p`
  color: ${({theme}) => theme.colors.primary};
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

        <P>This was added in the <code>dev</code> branch</P>

      </main>

      <footer>
        
      </footer>
    </div>
  )
}
