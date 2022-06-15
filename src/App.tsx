import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import { HomeScreen, LoginScreen } from './components/screens';
import { UserContext } from './contexts/UserContext';
import { JwtUserType } from './types/UserContext';

function App() {
  const [userContext, setUserContext] = useState<JwtUserType>();
  let navigate = useNavigate();

  useEffect(() => {
    // get user From localStorage
    const infoUserJson = localStorage.getItem(
      process.env.REACT_APP_JWT_SECRET!,
    );

    if (infoUserJson) {
      const infoUser = JSON.parse(infoUserJson);

      // check token Expiration
      const tokenExpiration = new Date(Number(infoUser.exp) * 1000);
      const dateNow = new Date();
      infoUser.tokenIsValid = tokenExpiration < dateNow ? false : true;
      setUserContext(infoUser);
    }
  }, []);

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
      // check if token is valid
      if (
        !userContext ||
        !Object.keys(userContext).includes('token') ||
        !Object.keys(userContext).includes('tokenIsValid') ||
        !userContext.tokenIsValid
      ) {
        return navigate('/login');
      }
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
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
