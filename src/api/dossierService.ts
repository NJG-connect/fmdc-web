import apiService from './apiService';
import urlApi from './endpoint';

async function getInfoDossierById(idDossier: string) {
  return await apiService.get(urlApi('dossierById', idDossier));
}

async function postFileOnDossier(idDossier: string, files: any) {
  return await apiService.postFile(urlApi('dossierFileById', idDossier), files);
}
async function editDossierById(idDossier: string, value: any) {
  return await apiService.patch(urlApi('dossierById', idDossier), value);
}

const dossierService = {
  getInfoDossierById,
  postFileOnDossier,
  editDossierById,
};
export default dossierService;
