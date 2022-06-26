export interface DossiersForToday {
  completeIntervention: number;
  date: string;
  pourcentFinished: number;
  totalIntervention: number;
}

export type SearchDossiers = Array<{
  name: string;
  id: number;
}>;
