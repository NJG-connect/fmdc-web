import React, { useMemo, useState } from 'react';
import images from '../../assets/images';
import { Couche, Dossier } from '../../types/Dossier';
import { laboratoireType } from '../../types/laboratoire';
import { formatDateForInput } from '../../utils/date';
import { formatIdPrelevement } from '../../utils/formatIdPrelevement';
import { Button, Input } from '../atoms';
import { CardItem, InterventionCollapse, Modal } from '../molecules';
import './laboDossier.css';

interface Props {
  dossier: Dossier;
  onSendCoucheForLabo: (
    coucheIds: { [key in number]: number[] },
    contrat: { laboratoire: laboratoireType; contrat?: string },
  ) => void;
}

const INIT_MODAL_LABO = {
  isOpen: false,
  contrat: { laboratoire: '', contrat: '' },
};

const DATA_LIST_LABORATOIRE = [
  { id: laboratoireType.ITGA, name: laboratoireType.ITGA },
];

export default function LaboDossier({ dossier, onSendCoucheForLabo }: Props) {
  const [idCoucheSelected, setidCoucheSelected] = useState<
    { coucheId: number; prelevementId: number; coucheNumero: number }[]
  >([]);

  // for valid Modal
  const [modalInfoForLabo, setmodalInfoForLabo] = useState<{
    isOpen: boolean;
    contrat: { laboratoire: string | laboratoireType; contrat: string };
  }>(INIT_MODAL_LABO);

  const onSelectCouche = (
    coucheId: number,
    prelevementId: number,
    coucheNumero: number,
  ) => {
    let newIdCoucheSelected = [...idCoucheSelected];
    if (idCoucheSelected.map(el => el.coucheId).includes(coucheId)) {
      newIdCoucheSelected = idCoucheSelected.filter(
        el => el.coucheId !== coucheId,
      );
    } else {
      newIdCoucheSelected = [
        ...newIdCoucheSelected,
        { coucheId, prelevementId, coucheNumero },
      ];
    }
    setidCoucheSelected(newIdCoucheSelected);
  };

  const handleSendCoucheForLabo = () => {
    const idCoucheSelectedTemp = [...idCoucheSelected];

    const idCouchesWithprelevementId: { [key in number]: number[] } =
      idCoucheSelectedTemp.reduce(
        (prev: { [key in number]: number[] }, current) => ({
          ...prev,
          [current.prelevementId]: Object.keys(prev).includes(
            current.prelevementId.toString(),
          )
            ? [...prev[current.prelevementId], current.coucheId]
            : [current.coucheId],
        }),
        {},
      );

    onSendCoucheForLabo(idCouchesWithprelevementId, {
      laboratoire: modalInfoForLabo.contrat.laboratoire as laboratoireType,
      // contrat: modalInfoForLabo.contrat.contrat
    });
    setmodalInfoForLabo(INIT_MODAL_LABO);
    setidCoucheSelected([]);
  };

  const couchesBySendLabo: {
    [x: string]: Couche[];
  } = useMemo(() => {
    let allCouches: Couche[] = [];
    dossier.myHAP.interventions.forEach(intervention => {
      intervention.prelevements &&
        intervention.prelevements.forEach(prelevement => {
          if (prelevement.couches) {
            allCouches = [...allCouches, ...prelevement.couches];
          }
        });
    });

    const couchesFormated = allCouches.reduce(
      (prev: any, current: any) => ({
        ...prev,
        [current.bonCommandeLabo]: Object.keys(prev).includes(
          current.bonCommandeLabo || 'null',
        )
          ? [...prev[current.bonCommandeLabo], current]
          : [current],
      }),
      {},
    );
    const { null: notSendValue = [], ...rest } = couchesFormated;
    return { notSendValue, ...rest };
  }, [dossier]);

  const printCardItem = (couche: Couche, hideSelect?: boolean) => {
    return (
      <CardItem
        onClick={() =>
          !hideSelect &&
          onSelectCouche(couche.id, couche.idPrelevement!, couche.numero!)
        }
        key={`${couche.id}`}>
        {!hideSelect ? (
          <img
            className="labo-couche-img-checkbox"
            alt="checked"
            src={
              idCoucheSelected.map(el => el.coucheId).includes(couche.id)
                ? images.checkBoxSelected
                : images.checkBoxNotSelected
            }
          />
        ) : (
          <div className="labo-couche-img-checkbox" />
        )}
        <label
          title={`${formatIdPrelevement(
            couche.idPrelevement!,
          )}-${couche.numero!}`}
          className="labo-couche-row">
          {`${formatIdPrelevement(couche.idPrelevement!)}-${couche.numero!}`}
        </label>
        <label title={couche.laboratoire || ''} className="labo-couche-row">
          {`${couche.laboratoire || '-'}`}
        </label>
        <label
          title={(couche.liant && 'Oui') || ''}
          className="labo-couche-row">
          {`${couche.liant || '-'}`}
        </label>
        <label
          title={(couche.granulat && 'Oui') || ''}
          className="labo-couche-row">
          {`${couche.granulat || '-'}`}
        </label>
        <label title={couche.HAP || ''} className="labo-couche-row">
          {`${couche.HAP || '-'}`}
        </label>
        <img className="labo-couche-icon" alt="goOn" src={images.arrowDown} />
      </CardItem>
    );
  };

  return (
    <div className="labo-container">
      <Modal
        isOpen={modalInfoForLabo.isOpen}
        onClose={() => {
          setmodalInfoForLabo(INIT_MODAL_LABO);
        }}
        title="ENVOI PRÉLEVEMENT(S)">
        <div className="modal-labo-container">
          <div className="modal-labo-content">
            <p>
              {idCoucheSelected.map(
                (el, index) =>
                  `${formatIdPrelevement(el.prelevementId)}-${el.coucheNumero}${
                    idCoucheSelected.length - 1 !== index ? ', ' : ''
                  }`,
              )}
            </p>

            <Input
              type="text"
              name="LABORATOIRE"
              list="labo-modal-laboratoire"
              dataList={DATA_LIST_LABORATOIRE}
              onChange={el =>
                setmodalInfoForLabo({
                  ...modalInfoForLabo,
                  contrat: {
                    ...modalInfoForLabo.contrat,
                    laboratoire: el,
                  },
                })
              }
              value={modalInfoForLabo.contrat?.laboratoire}
              classNameContainer="modal-labo-input"
            />

            {/* <Input
              type="text"
              name="CONTRAT"
              list="labo-modal-contrat"
              dataList={dossier.employes}
              onChange={el =>
                setmodalInfoForLabo({
                  ...modalInfoForLabo,
                  contrat: {
                    laboratoire: modalInfoForLabo.contrat?.laboratoire,
                    contrat: el,
                  },
                })
              }
              value={modalInfoForLabo.contrat?.contrat}
              classNameContainer="modal-labo-input"
            /> */}
          </div>
          <div>
            <Button
              onClick={handleSendCoucheForLabo}
              title="ENVOYER"
              className="labo-modal-button"
              disabled={
                !DATA_LIST_LABORATOIRE.map(el => el.id).includes(
                  modalInfoForLabo.contrat.laboratoire as laboratoireType,
                )
              }
            />
          </div>
        </div>
      </Modal>
      <div className="labo-container-content">
        <div className="labo-couche-card-title">
          <div className="labo-couche-row">N° COUCHE</div>
          <div className="labo-couche-row">LABORATOIRE</div>
          <div className="labo-couche-row">LIANT</div>
          <div className="labo-couche-row">GRANULAT</div>
          <div className="labo-couche-row">HAP</div>
        </div>
        {Object.entries(couchesBySendLabo).map(element => {
          const [keyOfBonCommandeLabo, couches]: [
            keyOfBonCommandeLabo: any,
            couches: Couche[],
          ] = element;
          return keyOfBonCommandeLabo === 'notSendValue' ? (
            couches.map((couche: Couche) => printCardItem(couche))
          ) : (
            <InterventionCollapse
              onClick={() => {}}
              title={`${formatDateForInput(
                couches[0].sendInfoLaboAt,
              )}: ${keyOfBonCommandeLabo}`}
              className="intervention-container-prelevement"
              key={keyOfBonCommandeLabo}>
              {couches.map((couche: Couche) => printCardItem(couche, true))}
            </InterventionCollapse>
          );
        })}
      </div>
      <div>
        <Button
          onClick={() => {
            setmodalInfoForLabo({ ...INIT_MODAL_LABO, isOpen: true });
          }}
          disabled={!idCoucheSelected.length}
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
