import React, { useState } from 'react';
import images from '../../assets/images';
import { Dossier, Intervention } from '../../types/Dossier';
import { laboratoireType } from '../../types/laboratoire';
import { formatDateForInput } from '../../utils/date';
import { formatIdPrelevement } from '../../utils/formatIdPrelevement';
import { Button } from '../atoms';
import { CardItem } from '../molecules';
import './laboDossier.css';

interface Props {
  dossier: Dossier;
  onSendCoucheForLabo: (
    coucheIds: { [key in number]: number[] },
    contrat: { laboratoire: laboratoireType; contrat?: string },
  ) => void;
}

export default function LaboDossier({ dossier, onSendCoucheForLabo }: Props) {
  const [idCoucheSelected, setidCoucheSelected] = useState<
    { coucheId: number; PrelevementId: number }[]
  >([]);

  const onSelectCouche = (coucheId: number, PrelevementId: number) => {
    let newIdCoucheSelected = [...idCoucheSelected];
    if (idCoucheSelected.map(el => el.coucheId).includes(coucheId)) {
      newIdCoucheSelected = idCoucheSelected.filter(
        el => el.coucheId !== coucheId,
      );
    } else {
      newIdCoucheSelected = [
        ...newIdCoucheSelected,
        { coucheId, PrelevementId },
      ];
    }
    setidCoucheSelected(newIdCoucheSelected);
  };

  const handleSendCoucheForLabo = () => {
    const idCoucheSelectedTemp = [...idCoucheSelected];

    const idCouchesWithPrelevementId: { [key in number]: number[] } =
      idCoucheSelectedTemp.reduce(
        (prev: { [key in number]: number[] }, current) => ({
          ...prev,
          [current.PrelevementId]: Object.keys(prev).includes(
            current.PrelevementId.toString(),
          )
            ? [...prev[current.PrelevementId], current.coucheId]
            : [current.coucheId],
        }),
        {},
      );

    onSendCoucheForLabo(idCouchesWithPrelevementId, {
      laboratoire: laboratoireType.ITGA,
    });
    setidCoucheSelected([]);
  };

  return (
    <div className="labo-container">
      <div className="labo-container-content">
        <div className="labo-couche-card-title">
          <div className="labo-couche-row">N° COUCHE</div>
          <div className="labo-couche-row">LABORATOIRE</div>
          <div className="labo-couche-row">LIANT</div>
          <div className="labo-couche-row">GRANULAT</div>
        </div>
        {dossier.myHAP.interventions &&
          dossier.myHAP.interventions.map(
            (intervention: Intervention, indexIntervention) => (
              <>
                {intervention.prelevements &&
                  intervention.prelevements.map(
                    (prelevement, indexPrelevement) =>
                      prelevement.couches &&
                      prelevement.couches.map((couche, indexCouche) => (
                        <CardItem
                          onClick={() =>
                            onSelectCouche(couche.id, prelevement.id)
                          }
                          key={`${indexIntervention}-${indexPrelevement}-${indexCouche}`}>
                          <img
                            className="labo-couche-img-checkbox"
                            alt="checked"
                            src={
                              idCoucheSelected
                                .map(el => el.coucheId)
                                .includes(couche.id)
                                ? images.checkBoxSelected
                                : images.checkBoxNotSelected
                            }
                          />
                          <label
                            title={`${formatIdPrelevement(prelevement.id)}-${
                              indexCouche + 1
                            }`}
                            className="labo-couche-row">
                            {`${formatIdPrelevement(prelevement.id)}-${
                              indexCouche + 1
                            }`}
                          </label>
                          <label
                            title={`${prelevement.date?.toString() || '-'}`}
                            className="labo-couche-row">
                            {formatDateForInput(prelevement.date) || '-'}
                          </label>
                          <label
                            className="labo-couche-row"
                            title={`${
                              prelevement.idIntervention
                                ? dossier.employes.find(
                                    el => el.id === prelevement.idIntervention,
                                  )?.name || '-'
                                : '-'
                            }`}>
                            {prelevement.idIntervention
                              ? dossier.employes.find(
                                  el => el.id === prelevement.idIntervention,
                                )?.name || '-'
                              : '-'}
                          </label>
                          <img
                            className="labo-couche-icon"
                            alt="goOn"
                            src={images.arrowDown}
                          />
                        </CardItem>
                      )),
                  )}
              </>
            ),
          )}
      </div>
      <div>
        <Button
          onClick={handleSendCoucheForLabo}
          title="ENVOI LABO"
          className="labo-button"
        />
      </div>
    </div>
  );
}

// const inventaire = [
//   { nom: "asperges", type: "legumes", quantite: 5 },
//   { nom: "bananes", type: "fruit", quantite: 0 },
//   { nom: "brebis", type: "viande", quantite: 23 },
//   { nom: "cerises", type: "fruit", quantite: 5 },
//   { nom: "poisson", type: "viande", quantite: 22 },
// ];

// const res = inventaire.reduce(
//   (prev, current) => ({
//     ...prev,
//     [current.type]: Object.keys(prev).includes(current.type)
//       ? [...prev[current.type], current]
//       : [current],
//   }),
//   {}
// );
