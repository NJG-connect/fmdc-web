import React, { useContext } from 'react';
import authService from '../../api/authService';
import { UserContext } from '../../contexts/UserContext';
import { LoginOrganism } from '../organisms';

export default function LoginContainer() {
  // for try login
  const { setUserContext } = useContext(UserContext);

  const login = async () => {
    const data = await authService.login({ login: 'julie', mdp: 'julie' });
    if (data.succes) {
      setUserContext(data.data);
    }
  };

  return <LoginOrganism />;
}
