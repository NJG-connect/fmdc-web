import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import authService from '../../api/authService';
import { UserContext } from '../../contexts/UserContext';
import ToastConfig from '../../types/Toast';
import { LoginOrganism } from '../organisms';

interface Props {
  goToHome: () => void;
}

export default function LoginContainer({ goToHome }: Props) {
  // for try login
  const { setUserContext } = useContext(UserContext);

  const login = async (userInfo: { login: string; mdp: string }) => {
    const data = await authService.login(userInfo);

    if (data.succes) {
      toast('Vous êtes bien connecté 😁', ToastConfig.SUCCESS);
      setUserContext(data.data);
      goToHome();
    } else {
      toast(data.data, ToastConfig.ERROR);
    }
  };

  return <LoginOrganism onSubmit={login} />;
}
