import React, { useContext } from 'react';
import authService from '../../api/authService';
import { UserContext } from '../../contexts/UserContext';
import { LoginOrganism } from '../organisms';

export default function LoginContainer() {
  // for try login
  const { setUserContext } = useContext(UserContext);

  const login = async (userInfo: { login: string; mdp: string }) => {
    const data = await authService.login(userInfo);
    if (data.succes) {
      setUserContext(data.data);
    }
  };

  return <LoginOrganism onSubmit={login} />;
}
