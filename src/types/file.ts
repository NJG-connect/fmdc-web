export enum FileTypeEnum {
  'ANNEXE' = 'ANNEXE',
  'PRE_RAPPORT' = 'PRE_RAPPORT',
  'RAPPORT' = 'RAPPORT',
  'PLAN' = 'PLAN',
  'DICT' = 'DICT',
  'INTERVENTION' = 'INTERVENTION',
  'DOSSIER' = 'DOSSIER',
}

export const FileTypeName: { [key in FileTypeEnum]: string } = {
  [FileTypeEnum.ANNEXE]: 'Annexe',
  [FileTypeEnum.PRE_RAPPORT]: 'Pre-rapport',
  [FileTypeEnum.RAPPORT]: 'Rapport',
  [FileTypeEnum.PLAN]: 'Plan',
  [FileTypeEnum.DICT]: 'Dict',
  [FileTypeEnum.INTERVENTION]: 'Intervention',
  [FileTypeEnum.DOSSIER]: 'Docs',
};

export const FileEmplacement: { [key in FileTypeEnum]: string } = {
  [FileTypeEnum.ANNEXE]: '',
  [FileTypeEnum.PRE_RAPPORT]: '',
  [FileTypeEnum.DOSSIER]: '',
  [FileTypeEnum.RAPPORT]: '',
  [FileTypeEnum.PLAN]: '/PLAN',
  [FileTypeEnum.DICT]: '/DICT-ARRETE',
  [FileTypeEnum.INTERVENTION]: '/PHOTO-INTERVENTION',
};

export interface FileResponseUpload {
  sucess: FileType[];
  errors: string[];
}

export interface FileType {
  name: string;
  type: string;
  emplacement?: string;
  link: string;
  date?: Date;
}

export const allFormatFile = [
  'jpg',
  'jpeg',
  'png',
  'svg',
  'gif',
  'ico',
  'webp',
  'pdf',
  'doc',
];
