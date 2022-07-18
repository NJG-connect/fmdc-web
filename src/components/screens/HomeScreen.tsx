import React from 'react';
import { HomeContainer } from '../containers';
import { useNavigate } from 'react-router-dom';

export default function HomeScreen() {
  let navigate = useNavigate();

  function goToDossier(idDossier: Number) {
    navigate(`/dossier/${idDossier}`, {
      state: {},
    });
  }

  return <HomeContainer goToDossier={goToDossier} />;
}
