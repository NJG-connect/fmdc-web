import React, { useState, useCallback } from 'react';
import { Dossier, keyOfMenuIndex, menuIndex } from '../../types/Dossier';
import { laboratoireType } from '../../types/laboratoire';
import { Spinner } from '../atoms';
import { DossierTemplate } from '../templates';
import { DocsDossier, HomeDossier, Intervention, LaboDossier } from '../views';
import './dossierOrganism.css';

interface Props {
  dossier: Dossier | undefined;
  postOnlyFile: (files: any) => void;
  onEditDossier: (values: any) => void;
  onAddorEditIntervention: (intervention: any) => void;
  onSendCoucheForLabo: (
    coucheIds: { [key in number]: number[] },
    contrat: { laboratoire: laboratoireType; contrat?: string },
  ) => void;
}

export default function DossierOrganism({
  dossier,
  postOnlyFile,
  onEditDossier,
  onAddorEditIntervention,
  onSendCoucheForLabo,
}: Props) {
  const [keyMenu, setkeyMenu] = useState<keyOfMenuIndex>(menuIndex.lab);

  const printSection = useCallback(() => {
    if (!dossier) {
      return <Spinner className="loading-dossier" />;
    }
    if (keyMenu === menuIndex.dossier) {
      return (
        <HomeDossier
          dossier={dossier}
          postOnlyFile={postOnlyFile}
          onEditDossier={onEditDossier}
        />
      );
    } else if (keyMenu === menuIndex.intervention) {
      return (
        <Intervention
          dossier={dossier}
          onAddorEditIntervention={onAddorEditIntervention}
        />
      );
    } else if (keyMenu === menuIndex.docs) {
      return (
        <DocsDossier
          dossier={dossier}
          postOnlyFile={postOnlyFile}
          onEditDossier={onEditDossier}
        />
      );
    } else if (keyMenu === menuIndex.lab) {
      return (
        <LaboDossier
          dossier={dossier}
          onSendCoucheForLabo={onSendCoucheForLabo}
        />
      );
    }
  }, [
    dossier,
    keyMenu,
    postOnlyFile,
    onEditDossier,
    onAddorEditIntervention,
    onSendCoucheForLabo,
  ]);

  return (
    <DossierTemplate
      dossier={dossier}
      keyMenu={keyMenu}
      selectMenu={setkeyMenu}>
      <>{printSection()}</>
    </DossierTemplate>
  );
}
