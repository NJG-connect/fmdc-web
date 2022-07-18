import apiService from './apiService';
import urlApi from './endpoint';

async function getInfoDossierById(idDossier: string) {
  return await apiService.get(urlApi('dossierById', idDossier));
}

const dossierService = { getInfoDossierById };
export default dossierService;
