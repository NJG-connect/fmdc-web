import React from 'react';
import { HomeContainer } from '../containers';
import { useNavigate } from 'react-router-dom';

export default function HomeScreen() {
  let navigate = useNavigate();

  function goToLogin() {
    navigate('/login', { replace: true });
  }

  return <HomeContainer goToLogin={goToLogin} />;
}
