import { StatutDossier } from './Dossier';

export interface DossiersForToday {
  completeIntervention: number;
  date: string;
  pourcentFinished: number;
  totalIntervention: number;
  dossierForNextThreeDays: {
    [key: string]: Array<{
      StatutDossier: {
        idStatut: number;
        intitule: StatutDossier;
        ordre: number;
      };
      dateDebutMission: Date;
      ville?: string | null;
      dateFinMission: Date;
      idDossier: number;
      numero: number;
    }>;
  };
}

export type SearchDossiers = Array<{
  name: string;
  id: number;
}>;
