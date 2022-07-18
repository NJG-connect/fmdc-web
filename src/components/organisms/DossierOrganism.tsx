import React from 'react';
import { Dossier } from '../../types/Dossier';
import { HeaderTemplate, DossierTemplate } from '../templates';

interface Props {
  dossier: Dossier | undefined;
}

export default function DossierOrganism({ dossier }: Props) {
  return (
    <HeaderTemplate>
      <DossierTemplate>
        <div>
          <p>DossierOrganism</p>
        </div>
      </DossierTemplate>
    </HeaderTemplate>
  );
}
