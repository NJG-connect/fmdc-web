import React, { useState, useCallback } from 'react';
import { Dossier, keyOfMenuIndex, menuIndex } from '../../types/Dossier';
import { Spinner } from '../atoms';
import { DossierTemplate } from '../templates';
import { DocsDossier, HomeDossier, Intervention } from '../views';
import './dossierOrganism.css';

interface Props {
  dossier: Dossier | undefined;
  postOnlyFile: (files: any) => void;
  onEditDossier: (values: any) => void;
  onAddorEditIntervention: (intervention: any) => void;
}

export default function DossierOrganism({
  dossier,
  postOnlyFile,
  onEditDossier,
  onAddorEditIntervention,
}: Props) {
  const [keyMenu, setkeyMenu] = useState<keyOfMenuIndex>(menuIndex.dossier);

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
    }
  }, [dossier, keyMenu, onEditDossier, onAddorEditIntervention, postOnlyFile]);

  return (
    <DossierTemplate
      dossier={dossier}
      keyMenu={keyMenu}
      selectMenu={setkeyMenu}>
      <>{printSection()}</>
    </DossierTemplate>
  );
}
