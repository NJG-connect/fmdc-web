const LOCAL_URL = 'http://localhost:3000/';

// when we gonna have online url
const DEV_BASE_URL = 'http://localhost:3000/';

export const BASE_URL = LOCAL_URL || DEV_BASE_URL || '';

export const AUTH = 'auth/';
export const USER = 'user/';
export const DOSSIER = 'dossier/';
export const DOSSIERS = 'dossiers/';
export const INTERVENTION = 'intervention/';
export const PRELEVEMENT = 'prelevement/';
export const COUCHE = 'couches/';
export const FILE = 'file/';

type RootName =
  | 'login'
  | 'dossiersForToday'
  | 'searchDossiers'
  | 'dossierById'
  | 'dossierFileById';

export default function urlApi(
  rootName: RootName,
  ...args: Array<string | number>
): string {
  const url = {
    login: `${BASE_URL + AUTH + 'login'}`,
    dossiersForToday: `${BASE_URL + DOSSIERS + 'dossiersForToday'}`,
    searchDossiers: `${BASE_URL + DOSSIERS + args[0]}`,
    dossierById: `${BASE_URL + DOSSIER + args[0]}`,
    dossierFileById: `${BASE_URL + DOSSIER + args[0]}/${FILE}`,
  };
  return url[rootName];
}
