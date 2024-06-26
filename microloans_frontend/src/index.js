import React, {useEffect, createContext,  useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import App from './App';
import reportWebVitals from './reportWebVitals';
import { IndexPage } from './Pages/indexPage';
import { ChatPage } from './Pages/chatPage';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowseLoansPage } from './Pages/browseLoansPage/browseLoansPage';
import { AllUsersPage } from './Pages/allUsersPage';
import { ChatHistoryPage } from './Pages/chatHistoryPage';
import { BorrowerProposalPage } from './Pages/BorrowerProposalPage';
import { BorrowerProposalFormPage } from './Pages/BorrowerProposalFormPage';
import { LoansPage } from './Pages/loansPage';


const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userEmail, setUserEmail] = useState(0);
  const [roleId, setRoleId] = useState(0);
  const [isInvestor, setIsInvestor] = useState();

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  useEffect(() => {
    if (sessionStorage.getItem('token') !== null ) {
      setIsUserLoggedIn(true);
      const jwt = parseJwt(sessionStorage.getItem('token'));
      console.log("jwt", jwt)
      setUserId(jwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
      setUserEmail(jwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'])
      setRoleId(jwt['RoleId'])
      setIsInvestor(jwt['IsInvestor'])

    }
  }, [])


  

  return (
    <ThemeContext.Provider value={{ 
      isUserLoggedIn, 
      setIsUserLoggedIn, 
      userId, 
      setUserId,
      userEmail,
      setUserEmail,
      roleId, 
      setRoleId,
      isInvestor, 
      setIsInvestor
      }}>
      {children}
    </ThemeContext.Provider>
  );
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage/>,
  },
  {
    path: "/browseLoansPage",
    element: <BrowseLoansPage/>,
  },
  {
    path: "/chat/:id",
    element: <ChatPage/>,
  },
  {
    path: "/chat-history",
    element: <ChatHistoryPage/>,
  },
  {
    path: '/createProposal',
    element: <BorrowerProposalFormPage/>
  },
  {
    path: '/users',
    element: <AllUsersPage/>
  },
  {
    path: '/active-loans',
    element: <LoansPage/>
  },
  {
    path: '/borrower-proposal/:id',
    element: <BorrowerProposalPage/>
  },
 
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
          <RouterProvider router={router} >
          </RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);

export {ThemeContext};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
