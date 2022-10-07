// NOTE: Importing these from '@mui/system' did NOT work for my setup (passing my theme to both MUI and Styled Components).
//         I started with these imports because MUI docs show that in their theme example on this page: https://mui.com/system/styled/
// import { ThemeProvider as MUIThemeProvider, createTheme as createMUITheme } from '@mui/system';

// ...instead, importing from '@mui/material/styles' works for my setup. Some of MUI's docs show using these imports, e.g., https://mui.com/customization/theme-components/#global-style-overrides
import { ThemeProvider as MUIThemeProvider, createTheme as createMUITheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import muiCompatibleTheme from '../components/_theme';
import GlobalStyle from '../components/_globalStyles';
import { UserAuthContext } from '../lib/context';
import { auth, firestore } from '../lib/firebase';
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

  // Handle user log in event
  useEffect(() => {
    // When login occurs
    if (userAuth) {      
      try { 
        ( async () => {
          const userDocRef = doc(firestore, 'users', userAuth.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          // Add a new user doc if this user doesn't have one yet
          if (!userDocSnap.exists()) {
            const { uid, displayName, email, photoURL } = userAuth;
  
            await setDoc(userDocRef, {
              uid,
              displayName,
              email,
              photoURL
            });
          }
          



          // Redirect user to appropriate next page, depending on which orgs they belong to          
          const userOrgsRef = collection(userDocRef, "userOrgs");          
          const userOrgDocsSnap = await getDocs(userOrgsRef);
          
          if (userOrgDocsSnap.docs.length) {
            
            // TEMP: Check the user's orgs
            userOrgDocsSnap.docs.forEach(async userOrgSnap => { 
              const userOrg = userOrgSnap.data();
              console.log('UserOrg data: ', userOrg);
              // Get the corresponding Org document and print its name
              const orgDocRef = doc(firestore, 'orgs', userOrg.orgID);
              const orgDocSnap = await getDoc(orgDocRef);
              console.log('Org data: ', orgDocSnap.data());              
            });            


            // ******* TODO: Redirect the user to either the select-org page or the logged-in home page if they are associated with only 1 org.      
            
            // Redirect to the select-org page
            // router.push('/select-org');


          } else {
            console.log("No user orgs yet");
            
            // ******* TODO      
              
            // Redirect to the select-org page (where the user can also opt to "accept invite" or create a new org)
            // router.push('/select-org');
          }
        })();       
      } catch (error) {
        console.error(error);
      }
    } 
  }, [userAuth]);

  // TEMP (testing the ability to read all users from db) ---------
  // useEffect(() => {
  //   ( async () => {
  //       if (userAuth) {
  //         try {
  //           const docsSnapshot = await getDocs(collection(firestore, 'users'));        
  //           docsSnapshot.forEach(doc => console.log(doc.data()));          
  //         } catch (error) {
  //           console.log(error);
  //         }          
  //       } else {
  //         console.log('User not logged in, so I\'m not trying to read from the database.');
  //       }
  //   })();    
  // }, [userAuth]);



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
