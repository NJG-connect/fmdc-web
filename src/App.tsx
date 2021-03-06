import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import {
  HomeScreen,
  LoginScreen,
  DossierScreen,
  BackToHomeScreen,
} from './components/screens';
import { UserContext } from './contexts/UserContext';
import { JwtUserType } from './types/UserContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './app.css';

function App() {
  const getInfoFromStorage = (): JwtUserType | undefined => {
    const infoLocalStorage = localStorage.getItem(
      process.env.REACT_APP_JWT_SECRET!,
    );

    if (infoLocalStorage) {
      return JSON.parse(infoLocalStorage);
    }
    return undefined;
  };

  const [userContext, setUserContext] = useState<JwtUserType | undefined>(
    getInfoFromStorage(),
  );
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

  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage('fadeOut');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <UserContext.Provider value={{ userContext, setUserContext }}>
        <div
          className={`${transitionStage}`}
          onAnimationEnd={() => {
            if (transitionStage === 'fadeOut') {
              setTransistionStage('fadeIn');
              setDisplayLocation(location);
            }
          }}>
          <div id="app-modal" />

          <Routes location={displayLocation}>
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/dossier/:idDossier" element={<DossierScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="*" element={<BackToHomeScreen />} />
            {/* <Route path="*" element={<Navigate to="/home" replace />} /> */}
          </Routes>
        </div>

        <ToastContainer />
      </UserContext.Provider>
    </>
  );
}

export default App;
