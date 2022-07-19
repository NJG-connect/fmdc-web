import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dossier, keyOfMenuIndex, menuForDossier } from '../../types/Dossier';
import { IconButton } from '../atoms';
import './dossierTemplate.css';

import HeaderTemplate from './HeaderTemplate';

interface Props {
  children: React.ReactNode;
  dossier: Dossier | undefined;
  keyMenu?: keyOfMenuIndex;
  selectMenu: (value: keyOfMenuIndex) => void;
}
export default function DossierTemplate({
  children,
  dossier,
  keyMenu,
  selectMenu,
}: Props) {
  let navigate = useNavigate();

  return (
    <HeaderTemplate>
      <div className="dossier-template">
        <div className="dossier-template-header-content">
          <div className="dossier-template-header">
            <IconButton
              img="backIcon"
              imgClassName="dossier-template-icon"
              onClick={() => navigate('/home', { replace: true })}
            />
            <p className="dossier-template-header-title">
              {dossier?.diag.numero} - {dossier?.diag.reference}
            </p>
            <p className="dossier-template-header-statut">
              {dossier?.diag.StatutDossier.intitule}
            </p>
          </div>
          <div className="dossier-template-menu">
            {Object.entries(menuForDossier).map(([key, value]) => (
              <div
                key={key}
                className={`dossier-template-menu-item ${
                  key === keyMenu ? 'dossier-template-menu-item-selected' : ''
                }`}
                onClick={() => selectMenu(key as keyOfMenuIndex)}>
                <p>{value}</p>
              </div>
            ))}
          </div>
          <div className="dossier-template-line" />
        </div>
        <div className="dossier-template-content">{children}</div>
      </div>
    </HeaderTemplate>
  );
}
