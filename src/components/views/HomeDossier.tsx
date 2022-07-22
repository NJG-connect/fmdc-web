import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dossier } from '../../types/Dossier';
import {
  Button,
  CheckBox,
  IconButton,
  Input,
  Spinner,
  Textarea,
} from '../atoms';
import { CardImageDossier } from '../molecules';
import './homeDossier.css';

interface Props {
  dossier: Dossier | undefined;
}

export default function HomeDossier({ dossier: dossierProps }: Props) {
  const initDossier = useMemo(
    () => (!!dossierProps ? dossierProps : undefined),
    [dossierProps],
  );
  const [dossier, setdossier] = useState<Dossier | undefined>(dossierProps);
  const inputAddFileOnDossierRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setdossier(initDossier);
  }, [initDossier]);

  useEffect(() => {
    console.log(inputAddFileOnDossierRef); // { current: <h1_object> }
  }, [inputAddFileOnDossierRef]);

  const onEditDossier = () => {};

  const handleSave = () => {
    console.log('save');
  };

  const clickOnAddFile = (
    justClick: boolean,
    event?: (EventTarget & HTMLInputElement) | any,
  ) => {
    if (!!justClick) {
      if (null !== inputAddFileOnDossierRef.current) {
        return inputAddFileOnDossierRef.current.click();
      }
    }
    console.log('alllerr');
    console.log(event);
  };

  if (!dossier) {
    return <Spinner />;
  }
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
              onChange={onEditDossier}
              classNameContainer="input-home-dossier"
            />
          </div>
          <div className="home-dossier-right-half">
            <Input
              type="text"
              name="DATE DE COMMANDE :"
              onChange={onEditDossier}
              value={String(dossier.diag.dateCommande)}
              classNameContainer="input-home-dossier"
            />

            <CheckBox
              onChange={onEditDossier}
              value={dossier.myHAP.isParkMarker}
              classNameContainer="input-home-dossier"
              name="Test Park Marker"
            />
          </div>
          <Textarea
            name="COMMENTAIRE"
            onChange={onEditDossier}
            value={dossier.diag.commentaire}
            classNameContainer="textArea-container-home-dossier"
            className="textArea-input-home-dossier"
          />

          <div className="home-dossier-list-docs">
            {dossier.diag.docs.map(file => (
              <CardImageDossier key={file.name} file={file} />
            ))}
            <IconButton
              onClick={() => clickOnAddFile(true)}
              className="dossier-add-file"
              img="addFile"
              imgClassName="dossier-add-file-image"
            />
          </div>
          <input
            ref={inputAddFileOnDossierRef}
            type="file"
            id="addFileInput"
            name="addFileInput"
            className="dossier-add-file-image-input"
            onChange={event => clickOnAddFile(false, event)}
          />
        </div>
      </div>
      <div className="dossier-valid-content">
        <Button
          onClick={handleSave}
          title="Enregistrer"
          className="dossier-button"
        />
      </div>
    </div>
  );
}
