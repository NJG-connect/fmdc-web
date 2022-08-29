import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContainer } from '../containers';

export default function LoginScreen() {
  let navigate = useNavigate();

  function goToHome() {
    navigate('/home', { replace: true });
  }

  return <LoginContainer goToHome={goToHome} />;
}
