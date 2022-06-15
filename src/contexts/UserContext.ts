import { createContext } from 'react';
import { UserContextType } from '../types/UserContext';

export const initialUserContext = {
  userContext: undefined,
  setUserContext: (): void => {
    throw new Error('setContext function must be overridden');
  },
};

export const UserContext = createContext<UserContextType>(initialUserContext);
// export default UserContext;
