import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackToHomeScreen() {
  let navigate = useNavigate();

  useEffect(() => {
    navigate('/home', { replace: true });
  }, [navigate]);

  return <div>Loading</div>;
}
