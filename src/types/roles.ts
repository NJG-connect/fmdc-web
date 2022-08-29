export enum Roles {
  GU_1 = "GU_1",
  GU_2 = "GU_2",
  GU_3 = "GU_3",
  GU_5 = "GU_5",
  GU_6 = "GU_6",
  GU_7 = "GU_7",
  USERS = "USERS",
}

export const roles: { [key in Roles]: string } = {
  [Roles.GU_1]: "WEB",
  [Roles.GU_2]: "Assistante administratives & Commerciales",
  [Roles.GU_3]: "Administrateurs",
  [Roles.GU_5]: "Assistante financière",
  [Roles.GU_6]: "Technicien",
  [Roles.GU_7]: "Responsable",
  [Roles.USERS]: "Utilisateurs",
};
