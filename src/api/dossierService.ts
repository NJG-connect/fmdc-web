import apiService from './apiService';
import urlApi from './endpoint';

async function getInfoDossierById(idDossier: string) {
  return await apiService.get(urlApi('dossierById', idDossier));
}

async function postFileOnDossier(idDossier: string, files: any) {
  return await apiService.postFile(urlApi('dossierFileById', idDossier), files);
}

const dossierService = { getInfoDossierById, postFileOnDossier };
export default dossierService;
