import React from 'react';
import './dossierTemplate.css';

interface Props {
  children: React.ReactNode;
}
export default function DossierTemplate({ children }: Props) {
  return (
    <div className="header-dossier">
      <p>DossierTemplate</p>
      <div>{children}</div>
    </div>
  );
}
