import React from 'react';
import { Prelevement as PrelevementType } from '../../types/Dossier';
import { formatDateForInput } from '../../utils/date';
import { formatIdPrelevement } from '../../utils/formatIdPrelevement';
import './prelevement.css';

interface Props {
  prelevement: PrelevementType;
}

export default function Prelevement({ prelevement }: Props) {
  return (
    <div className="prelevement-modal-container">
      <div className="prelevement-modal-tilte-content">
        <p>
          <b> {formatIdPrelevement(prelevement.id)} </b>
        </p>
        <p>{formatDateForInput(prelevement.date)}</p>
      </div>
      <div className="prelevement-modal-header-side">
        <div className="prelevement-modal-left">
          <p>
            <b>Adresse : </b>
          </p>
          <p>{prelevement.adresse}</p>
          <p>
            Coordonnées : {prelevement.latitude} {prelevement.longitude}
            {prelevement.altitude}
          </p>
        </div>
        <div className="prelevement-modal-right">
          <p>
            <b>Emplacement :</b> {prelevement.emplacement}
          </p>
          <p>
            <b>Matériaux :</b> {prelevement.emplacement}
          </p>
          <p>
            <b>Couleur :</b> {prelevement.couleur}
          </p>
          <p>
            <b>Tailles :</b> {prelevement.taille}
          </p>
        </div>
      </div>

      <div className="prelevement-modal-couches">
        <p>
          <b>Couches :</b>
        </p>
        {prelevement.couches.map((couche, indexCouche) => (
          <p className="prelevement-modal-couche" key={indexCouche}>
            <b>
              {`${formatIdPrelevement(prelevement.id)}-${couche.id}`} :{' '}
              {couche.taille} - {couche.couleur}
            </b>
          </p>
        ))}
      </div>
      <div className="prelevement-modal-img-container"></div>
    </div>
  );
}
