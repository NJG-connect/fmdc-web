import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import { HomeScreen, LoginScreen } from './components/screens';
import { UserContext } from './contexts/UserContext';
import { JwtUserType } from './types/UserContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [userContext, setUserContext] = useState<JwtUserType>();
  let navigate = useNavigate();

  // check have valid token however redicted to login
  useEffect(() => {
    const infoLocalStorage = localStorage.getItem(
      process.env.REACT_APP_JWT_SECRET!,
    );

    // wait until context get localStorage info
    if (
      JSON.stringify(userContext) === infoLocalStorage ||
      infoLocalStorage === null
    ) {
      // check if userContext and info for token exist
      if (userContext && userContext.token && userContext.exp) {
        // check token Expiration
        const tokenExpiration = new Date(Number(userContext.exp) * 1000);
        const dateNow = new Date();
        const tokenIsValid = tokenExpiration < dateNow ? false : true;

        if (tokenIsValid) {
          return;
        }
      }
      return navigate('/login');
    }
  }, [navigate, userContext]);

  // when update UserContext we push into localstorage
  useEffect(() => {
    if (
      userContext &&
      JSON.stringify(userContext) !==
        localStorage.getItem(process.env.REACT_APP_JWT_SECRET!)
    ) {
      localStorage.setItem(
        process.env.REACT_APP_JWT_SECRET!,
        JSON.stringify(userContext),
      );
    }
  }, [userContext]);

  return (
    <>
      <UserContext.Provider value={{ userContext, setUserContext }}>
        <Routes>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/login" element={<HomeScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <ToastContainer />
      </UserContext.Provider>
    </>
  );
}

export default App;
