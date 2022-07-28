import React, { useMemo, useState } from 'react';
import images from '../../assets/images';
import {
  Dossier,
  Intervention,
  InterventionForUpdateOrCreate,
} from '../../types/Dossier';
import { formatDateForInput } from '../../utils/date';
import { formatIdPrelevement } from '../../utils/formatIdPrelevement';
import { Button, Input } from '../atoms';
import { CardItem, InterventionCollapse, Modal } from '../molecules';
import './intervention.css';

interface Props {
  dossier: Dossier;
  onAddorEditIntervention: (value: any) => void;
}
const INIT_MODAL = { isOpen: false, interventionIndex: undefined };
const INIT_INTERVENTION: InterventionForUpdateOrCreate = {
  dateDebutMission: null,
  dateFinMission: null,
  idEmployeIntervention: null,
  zones: null,
  isFirstIntervention: false,
  prelevements: [],
};

export default function InterventionComponent({
  dossier,
  onAddorEditIntervention,
}: Props) {
  const [modalInfo, setmodalInfo] = useState<{
    isOpen: boolean;
    interventionIndex?: number;
  }>(INIT_MODAL);

  const [newIntervention, setnewIntervention] =
    useState<InterventionForUpdateOrCreate>(INIT_INTERVENTION);

  const onEditCurrentIntervention = (
    name: keyof typeof newIntervention,
    value: any,
  ) => {
    let newInterventionEdited = { ...newIntervention };
    newInterventionEdited[name as keyof typeof newInterventionEdited] =
      value as never;

    setnewIntervention(newInterventionEdited);
  };

  const dateInterventionFormat = useMemo(() => {
    return {
      dateDebutMission: !!newIntervention.dateDebutMission
        ? formatDateForInput(newIntervention.dateDebutMission)
        : undefined,
      dateFinMission: !!newIntervention.dateFinMission
        ? formatDateForInput(newIntervention.dateFinMission)
        : undefined,
    };
  }, [newIntervention]);

  const idInterventionOnDossier = useMemo(() => {
    const employeExist = dossier.employes.find(
      el =>
        newIntervention.idEmployeIntervention === el.id ||
        (newIntervention.idEmployeIntervention as unknown as string) ===
          el.name,
    );
    return {
      id: employeExist?.id,
      name: employeExist?.name || newIntervention.idEmployeIntervention,
    };
  }, [dossier.employes, newIntervention.idEmployeIntervention]);

  const buttonIsDisabled = useMemo(() => {
    const idEmployeInterventionIsValid = !!idInterventionOnDossier.name
      ? !!idInterventionOnDossier.id
      : true;

    return !newIntervention.dateDebutMission || !idEmployeInterventionIsValid;
  }, [
    idInterventionOnDossier.id,
    idInterventionOnDossier.name,
    newIntervention.dateDebutMission,
  ]);

  const handleAddorEditIntervention = () => {
    const formatNewIntervention = { ...newIntervention };

    if (!!formatNewIntervention.dateDebutMission) {
      formatNewIntervention.dateDebutMission = new Date(
        formatNewIntervention.dateDebutMission,
      );
    }

    if (!!formatNewIntervention.dateFinMission) {
      formatNewIntervention.dateFinMission = new Date(
        formatNewIntervention.dateFinMission,
      );
    }
    formatNewIntervention.idEmployeIntervention =
      idInterventionOnDossier.id || null;
    setmodalInfo(INIT_MODAL);
    onAddorEditIntervention(formatNewIntervention);
  };

  return (
    <div className="intervention-container">
      <Modal
        title={
          modalInfo.interventionIndex === undefined
            ? "Création d'une Intervention"
            : 'Modification Intervention'
        }
        onClose={() => {
          setmodalInfo(INIT_MODAL);
          setnewIntervention(INIT_INTERVENTION);
        }}
        isOpen={modalInfo.isOpen}>
        <div className="modal-intervention-container">
          <div className="modal-intervention-content">
            <Input
              name="DÉBUT"
              onChange={value => {
                onEditCurrentIntervention('dateDebutMission', value);
              }}
              value={dateInterventionFormat.dateDebutMission}
              type="date"
              classNameContainer="intervention-modal-input"
            />
            <Input
              name="FIN"
              onChange={value => {
                onEditCurrentIntervention('dateFinMission', value);
              }}
              value={dateInterventionFormat.dateFinMission}
              type="date"
              classNameContainer="intervention-modal-input"
            />

            <Input
              type="text"
              name="TECHNICIEN"
              list="intervention-modal-technicien"
              dataList={dossier.employes}
              onChange={value => {
                onEditCurrentIntervention('idEmployeIntervention', value);
              }}
              value={idInterventionOnDossier.name}
              classNameContainer="intervention-modal-input"
            />
          </div>
          <div>
            <Button
              onClick={handleAddorEditIntervention}
              title={
                modalInfo.interventionIndex === 0 ? 'Enregistrer' : 'Modifier'
              }
              className="intervention-modal-button"
              disabled={buttonIsDisabled}
            />
          </div>
        </div>
      </Modal>
      {dossier.myHAP.interventions &&
        dossier.myHAP.interventions.map(
          (intervention: Intervention, indexIntervention) => (
            <InterventionCollapse
              onClick={() => {
                setnewIntervention({
                  ...INIT_INTERVENTION,
                  ...dossier.myHAP.interventions[indexIntervention],
                });
                setmodalInfo({
                  isOpen: true,
                  interventionIndex: indexIntervention,
                });
              }}
              rightIcon="edit"
              title={`${formatDateForInput(intervention.dateDebutMission)} ${
                intervention.dateFinMission
                  ? '- ' + formatDateForInput(intervention.dateFinMission)
                  : ''
              }`}
              className="intervention-container-prelevement"
              key={indexIntervention}>
              <>
                {intervention.prelevements &&
                  intervention.prelevements.map(
                    (prelevement, indexPrelevement) => (
                      <CardItem
                        key={`${indexIntervention}-${indexPrelevement}`}>
                        <label
                          title={`${formatIdPrelevement(prelevement.id)}`}
                          className="intervention-prelevement-row">
                          {formatIdPrelevement(prelevement.id)}
                        </label>
                        <label
                          title={`${prelevement.date?.toString() || '-'}`}
                          className="intervention-prelevement-row">
                          {formatDateForInput(prelevement.date) || '-'}
                        </label>
                        <label
                          className="intervention-prelevement-row"
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
                          className="intervention-prelevement-icon"
                          alt="goOn"
                          src={images.arrowDown}
                        />
                      </CardItem>
                    ),
                  )}
              </>
            </InterventionCollapse>
          ),
        )}
      <div>
        <Button
          onClick={() => {
            setnewIntervention(INIT_INTERVENTION);
            setmodalInfo({ isOpen: true });
          }}
          title="Ajouter une Intervention"
          className="intervention-modal-button"
        />
      </div>
    </div>
  );
}
