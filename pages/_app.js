// NOTE: Importing these from '@mui/system' did NOT work for my setup (passing my theme to both MUI and Styled Components).
//         I started with these imports because MUI docs show that in their theme example on this page: https://mui.com/system/styled/
// import { ThemeProvider as MUIThemeProvider, createTheme as createMUITheme } from '@mui/system';

// ...instead, importing from '@mui/material/styles' works for my setup. Some of MUI's docs show using these imports, e.g., https://mui.com/customization/theme-components/#global-style-overrides
import { ThemeProvider as MUIThemeProvider, createTheme as createMUITheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
import muiCompatibleTheme from '../styles/theme';
import GlobalStyle from '../styles/globalStyles';
import { UserAuthContext } from '../lib/context';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import ProtectRoutes from '../components/protectRoutes';


// Theme approach:  
//   (1) Create my own theme but use MUI's theme spec, meaning that I use 
//        their theme object structure (instead of making my own structure), and
//   (2) Pass the theme to both MUI (via their own ThemeProvider) and to the
//        Styled Components' ThemeProvider

const muiTheme = createMUITheme(muiCompatibleTheme);

function MyApp({ Component, pageProps }) {

  const [userAuth, isAuthLoading] = useAuthState(auth);
  const router = useRouter();

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  const componentWithLayout = getLayout(<Component {...pageProps} />);

  return (
    <>
      {/* Need this so we can override MUI styles.  See: https://stackoverflow.com/a/69210767/718325 */}
      <StyledEngineProvider injectFirst>
        <MUIThemeProvider theme={muiTheme}>
          <ThemeProvider theme={muiTheme}>
              <GlobalStyle />

              <UserAuthContext.Provider value={{ userAuth }}>
                <ProtectRoutes userAuth={ userAuth } isAuthLoading={ isAuthLoading } router={ router }>
                  {componentWithLayout}
                </ProtectRoutes>
              </UserAuthContext.Provider>
          </ThemeProvider>
        </MUIThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default MyApp;
