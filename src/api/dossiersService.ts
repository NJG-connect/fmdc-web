import apiService from './apiService';
import urlApi from './endpoint';

async function getInfoForToday() {
  return await apiService.get(urlApi('dossiersForToday'));
}

async function searchDossiers(info: string) {
  return await apiService.get(urlApi('searchDossiers', info));
}

const dossiersService = { getInfoForToday, searchDossiers };
export default dossiersService;
