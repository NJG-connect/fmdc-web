import { Dispatch, SetStateAction } from 'react';

export interface JwtUserType {
  notificationId?: string; // next for notification
  idUtilisateur: number;
  idGroupeUtilisateur: string;
  login: string;
  mail?: string;
  prenom?: string;
  nom?: string;
  token?: string;
  tokenIsValid?: boolean;
  exp: Date | string;
}
export interface UserContextType {
  userContext: JwtUserType | undefined;
  setUserContext: Dispatch<SetStateAction<JwtUserType | undefined>>;
}
