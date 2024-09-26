import App from 'App';
import QberiInSA from 'pages/pages/Businesses/Qberi_in_SA';
import About from 'pages/pages/Mains/About';
import BusinessUnits from 'pages/pages/Mains/Business-Units';
import PrivacyPolicy from 'pages/pages/Mains/Privacy';
import Terms from 'pages/pages/Mains/Terms';
import Alternate from 'pages/pages/landing/Alternate';
import { RouteObject } from 'react-router-dom';
import SimpleSignIn from 'pages/pages/authentication/simple/SignIn';
import SimpleSignUp from 'pages/pages/authentication/simple/SignUp';
import SimpleSignOut from 'pages/pages/authentication/simple/SignOut';
import SimpleForgotPassword from 'pages/pages/authentication/simple/ForgotPassword';
import Error404 from 'pages/error/Error404';
import MainLayoutProvider from 'providers/MainLayoutProvider';
import MainLayout from 'layouts/MainLayout';

const routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Alternate />
      },
      {
        path: '/about-us',
        element: <About />
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />
      },
      {
        path: '/terms-conditions',
        element: <Terms />
      },
      {
        path: '/business',
        children: [
          {
            path: '/units',
            element: <BusinessUnits />
          },
          {
            path: '/qberi-in-sa',
            element: <QberiInSA />
          }
        ]
      },
      {
        path: 'auth',
        children: [
          {
            path: 'sign-in',
            element: <SimpleSignIn />
          },
          {
            path: 'sign-up',
            element: <SimpleSignUp />
          },
          {
            path: 'sign-out',
            element: <SimpleSignOut />
          },
          {
            path: 'forgot-password',
            element: <SimpleForgotPassword />
          }
        ]
      },
      {
        path: '/',
        element: (
          <MainLayoutProvider>
            <MainLayout />
          </MainLayoutProvider>
        ),
        children: []
      },
      {
        path: '*',
        element: <Error404 />
      }
    ]
  }
];

export default routes;
