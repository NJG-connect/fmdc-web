import apiService from './apiService';
import urlApi from './endpoint';

async function postInterventionById(idDossier: string, values: any) {
  return await apiService.post(
    urlApi('newInterventionByIdDossier', idDossier),
    values,
  );
}
async function editInterventionById(
  idDossier: string,
  idIntervention: string,
  value: any,
) {
  return await apiService.patch(
    urlApi('interventionById', idDossier, idIntervention),
    value,
  );
}

const interventionService = {
  postInterventionById,
  editInterventionById,
};
export default interventionService;
