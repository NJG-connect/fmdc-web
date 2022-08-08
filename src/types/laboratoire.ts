export enum laboratoireType {
  'ITGA' = 'ITGA',
}

export const laboratoireTypeOfContrat: {
  [key in keyof typeof laboratoireType]: string[];
} = {
  [laboratoireType.ITGA]: [''],
};
