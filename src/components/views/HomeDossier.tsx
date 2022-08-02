import React, { useEffect, useMemo, useState } from 'react';
import images from '../../assets/images';
import { Diag, Dossier, MyHap } from '../../types/Dossier';
import { FileTypeEnum, FileTypeName } from '../../types/file';
import { Button, CheckBox, IconButton, Input, Textarea } from '../atoms';
import { CardImageDossier, Modal } from '../molecules';

import './homeDossier.css';

interface Props {
  dossier: Dossier;
  postOnlyFile: (files: any) => void;
  onEditDossier: (value: any) => void;
}
interface FileWaitForUpload {
  type?: FileTypeEnum.DICT | FileTypeEnum.PLAN | '';
  file?: File;
}
const initFile: FileWaitForUpload = { type: '' };

export default function HomeDossier({
  dossier: dossierProps,
  postOnlyFile,
  onEditDossier,
}: Props) {
  const [dossier, setdossier] = useState<Dossier>(
    JSON.parse(JSON.stringify(dossierProps)),
  );
  const [fileForAdd, setfileForAdd] = useState<FileWaitForUpload[]>([initFile]);
  const [openModalForFile, setopenModalForFile] = useState(false);
  const [fieldUpdated, setfieldUpdated] = useState<{ [key: string]: any }>({
    diag: {},
    myHAP: {},
  });

  useEffect(() => {
    if (
      JSON.stringify(dossierProps.diag.docs) !==
      JSON.stringify(dossier.diag.docs)
    ) {
      setopenModalForFile(false);
      setfileForAdd([initFile]);
      setdossier({
        ...dossier,
        diag: { ...dossier.diag, docs: dossierProps.diag.docs },
      });
    }
  }, [dossierProps, dossier]);

  const handleEditDossier = (
    keyOfDossier: keyof typeof dossier,
    nameInput: keyof Diag | keyof MyHap,
    value?: string | boolean,
  ) => {
    let newDossier: { [key: string]: any } = { ...dossier };

    newDossier[keyOfDossier][nameInput] = value || null;
    const newFieldUpdated = { ...fieldUpdated };
    if (value) {
      newFieldUpdated[keyOfDossier][nameInput] = value;
    } else {
      delete newFieldUpdated[keyOfDossier][nameInput];
    }

    setfieldUpdated(newFieldUpdated);
    setdossier(newDossier as Dossier);
  };

  const handleSave = () => {
    fieldUpdated.diag.idEmployeIntervention =
      idInterventionOnDossier.id || null;
    onEditDossier(fieldUpdated);
  };

  const handlePostFiles = () => {
    const formData = new FormData();
    let typeFileForUpdate: { [key: string]: { type: string } } = {};
    fileForAdd.forEach((oneFile, index) => {
      formData.append(`files[${index}]`, oneFile.file!, oneFile.file!.name!);
      typeFileForUpdate[oneFile.file!.name!] = { type: oneFile.type! };
    });
    formData.append('infoFiles', JSON.stringify(typeFileForUpdate));
    postOnlyFile(formData);
  };

  const clickOnAddFile = (
    justClick: boolean,
    indexOfInput: number,
    event?: any,
  ) => {
    const inputElement: HTMLInputElement | null = document.querySelector(
      `#addFileInput-${indexOfInput}`,
    );

    if (!!justClick) {
      if (null !== inputElement) {
        return inputElement!.click();
      }
    }

    const [oneFile] = event.target.files;
    onChangeOneFile(indexOfInput, 'file', oneFile);
  };

  const onChangeOneFile = (index: number, nameInput: string, event: string) => {
    let newFileForAdd = [...fileForAdd];

    newFileForAdd[index] = { ...newFileForAdd[index], [nameInput]: event };
    setfileForAdd(newFileForAdd);
  };

  const idInterventionOnDossier = useMemo(() => {
    const employeExist = dossier.employes.find(
      el =>
        dossier.diag.idEmployeIntervention === el.id ||
        (dossier.diag.idEmployeIntervention as unknown as string) === el.name,
    );
    return {
      id: employeExist?.id,
      name: employeExist?.name || dossier.diag.idEmployeIntervention,
    };
  }, [dossier.employes, dossier.diag.idEmployeIntervention]);

  const buttonIsDisabled = useMemo(() => {
    let idEmployeInterventionIsValid = !!idInterventionOnDossier.name
      ? !!idInterventionOnDossier.id
      : true;

    if (
      idEmployeInterventionIsValid &&
      idInterventionOnDossier.id === dossierProps.diag.idEmployeIntervention
    ) {
      idEmployeInterventionIsValid = !idEmployeInterventionIsValid;
    }

    return (
      !idEmployeInterventionIsValid &&
      dossierProps.diag.dateCommande === dossier.diag.dateCommande &&
      dossierProps.myHAP.typologie === dossier.myHAP.typologie &&
      dossierProps.myHAP.isParkMarker === dossier.myHAP.isParkMarker &&
      dossierProps.diag.commentaire === dossier.diag.commentaire
    );
  }, [
    dossier.diag.commentaire,
    dossier.diag.dateCommande,
    dossier.myHAP.isParkMarker,
    dossier.myHAP.typologie,
    dossierProps.diag.commentaire,
    dossierProps.diag.dateCommande,
    dossierProps.diag.idEmployeIntervention,
    dossierProps.myHAP.isParkMarker,
    dossierProps.myHAP.typologie,
    idInterventionOnDossier.id,
    idInterventionOnDossier.name,
  ]);

  return (
    <div className="home-dossier-content">
      <div className="home-dossier-form">
        <div className="home-dossier-left">
          <iframe
            className="gmap_canvas"
            title="gmap_canvas"
            src={`https://maps.google.com/maps?q=${
              dossier?.diag.adresse || ''
            }${
              (dossier?.diag.codePostal &&
                dossier.diag.codePostal.length === 5) ||
              ''
            }${dossier?.diag.ville || ''}${
              dossier?.diag.departement || ''
            }&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
          />

          <p className="home-dossier-adresse-title">nom du site</p>
          <div className="home-dossier-adresse">
            <p>
              <b>Adresse du site: </b>
            </p>
            <p>{dossier?.diag.adresse}</p>
            <p>
              {dossier?.diag.codePostal} - {dossier?.diag.ville}
            </p>
            <p>{dossier?.diag.departement}</p>
          </div>
        </div>

        <div className="home-dossier-right">
          <div className="home-dossier-right-half">
            <Input
              type="text"
              value={dossier.myHAP.typologie}
              name="TYPOLOGIE DE MISSION :"
              onChange={el => handleEditDossier('myHAP', 'typologie', el)}
              classNameContainer="input-home-dossier"
            />
            <Input
              type="text"
              name="TECHNICIEN"
              list="dossier-modal-technicien"
              dataList={dossier.employes}
              onChange={el =>
                handleEditDossier('diag', 'idEmployeIntervention', el)
              }
              value={idInterventionOnDossier.name}
              classNameContainer="input-home-dossier"
            />
          </div>
          <div className="home-dossier-right-half">
            <Input
              type="text"
              name="DATE DE COMMANDE :"
              onChange={el => handleEditDossier('diag', 'dateCommande', el)}
              value={String(dossier.diag.dateCommande)}
              classNameContainer="input-home-dossier"
            />

            <CheckBox
              onChange={value =>
                handleEditDossier('myHAP', 'isParkMarker', value)
              }
              value={dossier.myHAP.isParkMarker}
              classNameContainer="input-home-dossier"
              name="Test Park Marker"
            />
          </div>
          <Textarea
            name="COMMENTAIRE"
            onChange={value => handleEditDossier('diag', 'commentaire', value)}
            value={dossier.diag.commentaire}
            classNameContainer="textArea-container-home-dossier"
            className="textArea-input-home-dossier"
          />

          <div className="home-dossier-list-docs">
            {dossier.diag.docs.map((file, index) => (
              <CardImageDossier key={`${file.name}-${index}`} file={file} />
            ))}
            <IconButton
              onClick={() => setopenModalForFile(true)}
              className="dossier-add-file"
              img="addFile"
              imgClassName="dossier-add-file-image"
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={openModalForFile}
        onClose={() => setopenModalForFile(false)}
        title="Upload Fichier">
        <div className="modal-home-dossier-container">
          <div>
            {fileForAdd.map((addElement, index) => (
              <div className="dossier-modal-section-container" key={index}>
                <div className="dossier-modal-section-top">
                  <div className="dossier-modal-section">
                    <p>Ajoute un Type</p>
                    <select
                      name="typeFile"
                      id="typeFile"
                      value={addElement.type || ''}
                      onChange={event => {
                        onChangeOneFile(index, 'type', event.target.value);
                      }}
                      className="dossier-modal-select">
                      <option value="">Type du Fichier : </option>
                      {[FileTypeEnum.DICT, FileTypeEnum.PLAN].map(el => (
                        <option key={el} value={el}>
                          {FileTypeName[el]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="dossier-modal-section">
                    <p>Ajoute un Fichier :</p>
                    <input
                      type="file"
                      id={`addFileInput-${index}`}
                      className="dossier-add-file-image-input"
                      onChange={event => clickOnAddFile(false, index, event)}
                    />
                    <img
                      onClick={() => clickOnAddFile(true, index)}
                      className="dossier-modal-select dossier-modal-img-add"
                      alt="add-file"
                      src={addElement.file ? images.addFileOk : images.addFile}
                    />
                  </div>
                </div>
                {fileForAdd[index] &&
                  fileForAdd[index].file !== undefined &&
                  fileForAdd[index].file!.name !== undefined && (
                    <p className="dossier-modal-add-file-name">
                      nom du fichier ajouté : {fileForAdd[index].file!.name}
                    </p>
                  )}
                <div
                  className="dossier-modal-add-more-file"
                  onClick={() => {
                    setfileForAdd([...fileForAdd, initFile]);
                  }}>
                  Ajouter un Autre Fichier
                </div>
              </div>
            ))}
          </div>
          <div>
            <Button
              onClick={handlePostFiles}
              title="Enregistrer"
              className="dossier-modal-button"
              disabled={!fileForAdd.every(el => !!el.type && !!el.file)}
            />
          </div>
        </div>
      </Modal>

      <div className="dossier-valid-content">
        <Button
          disabled={buttonIsDisabled}
          onClick={handleSave}
          title="Enregistrer"
          className="dossier-button"
        />
      </div>
    </div>
  );
}
