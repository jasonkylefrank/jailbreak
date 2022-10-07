import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { isRunningOnServer } from "../lib/utlities";

// See inspiration from examples such as: https://azeezatraheem.medium.com/implementing-authentication-redirects-in-next-js-c15907ec82b7 or https://theodorusclarence.com/blog/nextjs-redirect-no-flashing

export default function ProtectRoutes({ userAuth, isAuthLoading, router, children }) {
  
  const unprotectedRoutes = [
    '/',
    '/about',
  ];

  const routeIsProtected = !unprotectedRoutes.find((route) => router.pathname === route);

  if (routeIsProtected) {
    if (isAuthLoading) {
      return (
        <>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >          
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      );
    } else if (!userAuth  && !isRunningOnServer()) {
      // Redirect to the home page
      router.push('/');
    }
  }

  return children;
}