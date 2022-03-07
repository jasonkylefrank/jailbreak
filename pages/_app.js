// NOTE: Importing these from '@mui/system' did NOT work for my setup (passing my theme to both MUI and Styled Components).
//         I started with these imports because MUI docs show that in their theme example on this page: https://mui.com/system/styled/
// import { ThemeProvider as MUIThemeProvider, createTheme as createMUITheme } from '@mui/system';

// ...instead, importing from '@mui/material/styles' works for my setup. Some of MUI's docs show using these imports, e.g., https://mui.com/customization/theme-components/#global-style-overrides
import { ThemeProvider as MUIThemeProvider, createTheme as createMUITheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import muiCompatibleTheme from '../styles/theme';
import GlobalStyle from '../styles/globalStyles';
import { UserAuthContext } from '../lib/context';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import Layout from '../components/Layout';


// Theme approach:  
//   (1) Create my own theme but use MUI's theme spec, meaning that I use 
//        their theme object structure (instead of making my own structure), and
//   (2) Pass the theme to both MUI (via their own ThemeProvider) and to the
//        Styled Components' ThemeProvider

const muiTheme = createMUITheme(muiCompatibleTheme);

function MyApp({ Component, pageProps }) {

  const [userAuth] = useAuthState(auth);

  return (
    <>
      <GlobalStyle />
        {/* Need this so we can override MUI styles.  See: https://stackoverflow.com/a/69210767/718325 */}
        <StyledEngineProvider injectFirst>
          <MUIThemeProvider theme={muiTheme}>
            <ThemeProvider theme={muiCompatibleTheme}>

            {/* Passing the result of MUI's createTheme() to the Styled Components Theme Provider does
            seem to work in my light testing but I'm hesitant to go with that approach so for now 
            I'm passing it a regular object like the Styled Components docs show. */}
            {/* <ThemeProvider theme={muiTheme}> */}

                <UserAuthContext.Provider value={{ userAuth }}>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </UserAuthContext.Provider>
            </ThemeProvider>
          </MUIThemeProvider>
        </StyledEngineProvider>
    </>
  );
}

export default MyApp;
