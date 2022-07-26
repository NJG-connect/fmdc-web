import React, { useState } from 'react';
import { Dossier, keyOfMenuIndex, menuIndex } from '../../types/Dossier';
import { Spinner } from '../atoms';
import { DossierTemplate } from '../templates';
import { HomeDossier } from '../views';
import './dossierOrganism.css';

interface Props {
  dossier: Dossier | undefined;
  postOnlyFile: (files: any) => void;
}

export default function DossierOrganism({ dossier, postOnlyFile }: Props) {
  const [keyMenu, setkeyMenu] = useState<keyOfMenuIndex>(menuIndex.dossier);

  return (
    <DossierTemplate
      dossier={dossier}
      keyMenu={keyMenu}
      selectMenu={setkeyMenu}>
      {dossier === undefined ? (
        <Spinner className="loading-dossier" />
      ) : (
        <HomeDossier dossier={dossier} postOnlyFile={postOnlyFile} />
      )}
    </DossierTemplate>
  );
}
