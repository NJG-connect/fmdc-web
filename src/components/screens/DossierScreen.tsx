import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DossierContainer } from '../containers';

export default function DossierScreen() {
  let { idDossier = undefined } = useParams();
  let navigate = useNavigate();

  const goToHome = useCallback(() => {
    navigate('/home', { replace: true });
  }, [navigate]);

  return <DossierContainer idDossier={idDossier} goToHome={goToHome} />;
}
