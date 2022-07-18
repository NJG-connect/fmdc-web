export interface Dossier {
  diag: Diag;
  MyHAP: MyHap;
}

export interface Diag {
  numero: number;
  idDossier: number;
  reference: string;
  adresse: string;
  cptAdresse: string;
  ville: string;
  pays: string;
  departement: string;
  longitude: string;
  latitude: string;
  commentaire: string;
  idStatut: number;
  StatutDossier: StatutDossier;
}
export interface MyHap {
  id: number;
  isParkMarker: boolean | null;
  typologie: string | null;
  docs: string | null;
  interventions: [];
}

export interface Intervention {
  id: number;
  dateDebutMission: string | null;
  dateFinMission: string | null;
  idEmployeIntervention: number | null;
  zones: String | null;
  isFirstIntervention: Boolean | null;
  idDossier: number;
  prelevements: Prelevement[];
}

export interface Prelevement {
  id: number;
  date: Date | null;
  emplacement: string | null;
  latitude: string | null;
  longitude: string | null;
  altitude: string | null;
  adresse: string | null;
  materiaux: string | null;
  taille: number | null;
  couleur: string | null;
  images: string | null;
  laboratoire: string | null;
  zone: string | null;
  resultat: string | null;
  PrelevementPossible: boolean | null;
  choixPrelevementImPossible: string | null;
  idIntervention: number | null;
  couches: Couche[];
}

export interface Couche {
  id: number;
  taille: string | null;
  couleur: string | null;
  amiante: boolean | null;
  materiaux: string | null;
  HAP: string | null;
  idPrelevement: number | null;
}

export enum StatutDossier {
  'A contacter' = 'A contacter',
  'A planifier' = 'A planifier',
  "En attente d'expertise" = "En attente d'expertise",
  'En attente de résultats' = 'En attente de résultats',
  'A facturer' = 'A facturer',
  'En attente BC / BT / OS' = 'En attente BC / BT / OS',
  'Demande incomplète' = 'Demande incomplète',
  'Rapport à envoyer' = 'Rapport à envoyer',
  'En attente rédaction rapport' = 'En attente rédaction rapport',
  'En attente de règlement' = 'En attente de règlement',
  'En attente Visa 1' = 'En attente Visa 1',
  'Bannette PROBLEME' = 'Bannette PROBLEME',
  'En attente résultats HAP' = 'En attente résultats HAP',
  'En attente de ré-intervention' = 'En attente de ré-intervention',
  'Annulé' = 'Annulé',
  'Terminé' = 'Terminé',
  'En attente de Rapport Final' = 'En attente de Rapport Final',
  'Données non exportées' = 'Données non exportées',
  'En attente facturation' = 'En attente facturation',
  'En attente Visa 2' = 'En attente Visa 2',
  'Sous-traités' = 'Sous-traités',
  'En attente ré-intervention BCL' = 'En attente ré-intervention BCL',
  'Litige' = 'Litige',
  'En attente dépôt prélèvements' = 'En attente dépôt prélèvements',
  'StandBy Bailleurs CC' = 'StandBy Bailleurs CC',
  'Stand-By 1001VH' = 'Stand-By 1001VH',
  'En attente infos/documents - DPE' = 'En attente infos/documents - DPE',
  'DRIVE' = 'DRIVE',
}
