import apiService from './apiService';
import urlApi from './endpoint';
import { UserForConnection } from '../types/User';

async function login(user: UserForConnection) {
  return await apiService.post(urlApi('login'), user);
}

const authService = { login };
export default authService;
