import apiService from './apiService';
import urlApi from './endpoint';

async function sendCouchetoLabo(idDossier: string, values: any) {
  return await apiService.post(urlApi('sendCouchetoLabo', idDossier), values);
}

const laboService = {
  sendCouchetoLabo,
};
export default laboService;
