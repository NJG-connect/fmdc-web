import React, { useState } from 'react';
import { Dossier, keyOfMenuIndex, menuIndex } from '../../types/Dossier';
import { DossierTemplate } from '../templates';

interface Props {
  dossier: Dossier | undefined;
}

export default function DossierOrganism({ dossier }: Props) {
  const [keyMenu, setkeyMenu] = useState<keyOfMenuIndex>(menuIndex.dossier);

  return (
    <DossierTemplate
      dossier={dossier}
      keyMenu={keyMenu}
      selectMenu={setkeyMenu}>
      <div>
        <p>DossierOrganism</p>
      </div>
    </DossierTemplate>
  );
}
