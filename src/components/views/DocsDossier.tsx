import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../api/endpoint';
import images from '../../assets/images';
import { Dossier } from '../../types/Dossier';
import { FileTypeEnum, FileTypeName } from '../../types/file';
import { formatDateForInput } from '../../utils/date';
import { Button, Textarea } from '../atoms';
import { CardItem, Modal } from '../molecules';
import './docsDossier.css';

interface Props {
  dossier: Dossier;
  postOnlyFile: (files: any) => void;
  onEditDossier: (value: any) => void;
}

interface FileWaitForUpload {
  type?:
    | FileTypeEnum.DOSSIER
    | FileTypeEnum.PRE_RAPPORT
    | FileTypeEnum.RAPPORT
    | FileTypeEnum.ANNEXE
    | '';
  file?: File;
  commentaire?: string;
  addNewFile: boolean;
}
const INIT_FILE: FileWaitForUpload = { type: '', addNewFile: false };

const INIT_MODAL_DOC = {
  isOpen: false,
  docsIndex: undefined,
};

export default function DocsDossier({
  dossier,
  postOnlyFile,
  onEditDossier,
}: Props) {
  const [modalInfoForDoc, setmodalInfoForDoc] = useState<{
    isOpen: boolean;
    docsIndex?: number;
  }>(INIT_MODAL_DOC);

  const [fileForAdd, setfileForAdd] = useState<FileWaitForUpload[]>([
    INIT_FILE,
  ]);

  useEffect(() => {
    if (modalInfoForDoc.docsIndex !== undefined) {
      setfileForAdd([
        {
          type: dossier.myHAP.docs[modalInfoForDoc.docsIndex].type,
          commentaire:
            dossier.myHAP.docs[modalInfoForDoc.docsIndex].commentaire,
          file: dossier.myHAP.docs[modalInfoForDoc.docsIndex],
          addNewFile: false,
        },
      ] as any);
    }
  }, [modalInfoForDoc.docsIndex, dossier.myHAP.docs]);

  const handlePostFiles = () => {
    const haveFile = fileForAdd.some(el => el.addNewFile);
    const formData = new FormData();
    let typeFileForUpdate: { [key: string]: string } = {};
    let fieldUpdate: any = { myHAP: { docs: [] } };
    fileForAdd.forEach((oneFile, index) => {
      if (oneFile.addNewFile) {
        formData.append(`files[${index}]`, oneFile.file!, oneFile.file!.name!);
        typeFileForUpdate[oneFile.file!.name!] = oneFile.type!;
      }

      let newValue: { [key: string]: string } = {};

      if (oneFile.file && !!oneFile.file.name) {
        newValue['name'] = oneFile.file.name;
        if (!!oneFile.commentaire) {
          newValue['commentaire'] = oneFile.commentaire;
        }
        if (oneFile.addNewFile === false && !!oneFile.type) {
          newValue['type'] = oneFile.type;
        }
      }
      Object.keys(newValue).length > 1 && fieldUpdate.myHAP.docs.push(newValue);
    });
    haveFile && formData.append('type', JSON.stringify(typeFileForUpdate));
    fieldUpdate.myHAP.docs.length > 0 && onEditDossier(fieldUpdate);

    haveFile && postOnlyFile(formData);
    setfileForAdd([INIT_FILE]);
    setmodalInfoForDoc(INIT_MODAL_DOC);
  };

  const clickOnAddFile = (
    justClick: boolean,
    indexOfInput: number,
    event?: any,
  ) => {
    const inputElement: HTMLInputElement | null = document.querySelector(
      `#addFileInput-docsDossier-${indexOfInput}`,
    );

    if (!!justClick) {
      if (null !== inputElement) {
        return inputElement!.click();
      }
    }
    let newFileForAdd = [...fileForAdd];
    newFileForAdd[indexOfInput] = {
      ...newFileForAdd[indexOfInput],
      addNewFile: true,
    };
    setfileForAdd(newFileForAdd);
    let [oneFile] = event.target.files;

    if (modalInfoForDoc.docsIndex !== undefined) {
      const newFile = new File(
        [oneFile],
        dossier.myHAP.docs[modalInfoForDoc.docsIndex].name,
      );
      oneFile = newFile;
    }

    onChangeOneFile(indexOfInput, 'file', oneFile);
  };

  const onChangeOneFile = (index: number, nameInput: string, event: string) => {
    let newFileForAdd = [...fileForAdd];
    newFileForAdd[index] = { ...newFileForAdd[index], [nameInput]: event };
    setfileForAdd(prevfileForAdd => {
      newFileForAdd[index] = {
        ...prevfileForAdd[index],
        ...newFileForAdd[index],
        addNewFile:
          prevfileForAdd[index].addNewFile || newFileForAdd[index].addNewFile,
      };
      return newFileForAdd;
    });
  };

  return (
    <div className="docsDossier-container">
      <Modal
        isOpen={modalInfoForDoc.isOpen}
        onClose={() => {
          setfileForAdd([INIT_FILE]);
          setmodalInfoForDoc(INIT_MODAL_DOC);
        }}
        title={
          modalInfoForDoc.docsIndex !== undefined
            ? dossier.myHAP.docs[modalInfoForDoc.docsIndex!].name
            : 'Ajouter des Fichiers'
        }>
        <div className="docsDossier-modal-container">
          <div>
            {fileForAdd.map((addElement, index) => (
              <div className="docsDossier-modal-section-container" key={index}>
                <div className="docsDossier-modal-section-top">
                  <div className="docsDossier-modal-section">
                    <p>Ajoute un Type</p>
                    <select
                      name="typeFile"
                      id="typeFile"
                      value={addElement.type || ''}
                      onChange={event => {
                        onChangeOneFile(index, 'type', event.target.value);
                      }}
                      className="docsDossier-modal-select">
                      <option value="">Type du Fichier : </option>
                      {[
                        FileTypeEnum.DOSSIER,
                        FileTypeEnum.PRE_RAPPORT,
                        FileTypeEnum.RAPPORT,
                        FileTypeEnum.ANNEXE,
                      ].map(el => (
                        <option key={el} value={el}>
                          {FileTypeName[el]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="docsDossier-modal-section">
                    <p>Ajoute un Fichier :</p>
                    <input
                      type="file"
                      id={`addFileInput-docsDossier-${index}`}
                      className="docsDossier-add-file-image-input"
                      onChange={event => clickOnAddFile(false, index, event)}
                    />
                    <img
                      onClick={() => clickOnAddFile(true, index)}
                      className="docsDossier-modal-select docsDossier-modal-img-add"
                      alt="add-file"
                      src={
                        addElement.file && addElement.addNewFile
                          ? images.addFileOk
                          : images.addFile
                      }
                    />
                  </div>
                </div>
                <div className="docsDossier-modal-textArea">
                  <Textarea
                    name="COMMENTAIRE"
                    onChange={event =>
                      onChangeOneFile(index, 'commentaire', event)
                    }
                    value={addElement.commentaire || ''}
                    classNameContainer="textArea-container-home-dossier"
                  />
                </div>
                {fileForAdd[index] &&
                  fileForAdd[index].file !== undefined &&
                  fileForAdd[index].file!.name !== undefined && (
                    <p className="docsDossier-modal-add-file-name">
                      nom du fichier ajouté : {fileForAdd[index].file!.name}
                    </p>
                  )}
                {modalInfoForDoc.docsIndex === undefined && (
                  <div
                    className="docsDossier-modal-add-more-file"
                    onClick={() => {
                      setfileForAdd([...fileForAdd, INIT_FILE]);
                    }}>
                    Ajouter un Autre Fichier
                  </div>
                )}
              </div>
            ))}
          </div>
          <div>
            <Button
              onClick={handlePostFiles}
              title="Enregistrer"
              className="docsDossier-modal-button"
              disabled={!fileForAdd.every(el => !!el.type && !!el.file)}
            />
          </div>
        </div>
      </Modal>
      <>
        <div className="docDossier-card-title">
          <div className="docDossier-row">RAPPORT</div>
          <div className="docDossier-row">DATE</div>
          <div className="docDossier-row">TYPE</div>
        </div>
        {dossier.myHAP.docs.map((docDossier: any, indexDocDossier: number) => (
          <CardItem
            onClick={() => {
              setmodalInfoForDoc({
                isOpen: true,
                docsIndex: indexDocDossier,
              });
            }}
            key={`${indexDocDossier}`}>
            <label title={`${docDossier.name}`} className="docDossier-row">
              {docDossier.name}
            </label>
            <label
              title={`${formatDateForInput(docDossier.date)}`}
              className="docDossier-row">
              {formatDateForInput(docDossier.date)}
            </label>
            <label
              className="docDossier-row"
              title={`${FileTypeName[docDossier.type as FileTypeEnum]}`}>
              {FileTypeName[docDossier.type as FileTypeEnum]}
            </label>

            <img
              className="docDossier-icon"
              alt="goOn"
              src={images.folderIcon}
              onClick={event => {
                event.stopPropagation();
                setmodalInfoForDoc({
                  isOpen: true,
                  docsIndex: indexDocDossier,
                });
              }}
            />

            <a
              href={`${BASE_URL}${docDossier.link}?download=true`}
              download
              target="_blank"
              rel="noreferrer"
              className="docDossier-icon-container">
              <img
                className="docDossier-icon"
                alt="goOn"
                src={images.seeDocument}
              />
            </a>
          </CardItem>
        ))}
      </>
      <CardItem
        className="docDossier-card-for-add-file"
        onClick={() => {
          setmodalInfoForDoc({
            isOpen: true,
            docsIndex: undefined,
          });
        }}>
        <img
          className="docDossier-icon-addFile"
          alt="addFile"
          src={images.addFile}
          onClick={() => {
            setmodalInfoForDoc({
              isOpen: true,
              docsIndex: undefined,
            });
          }}
        />
      </CardItem>
    </div>
  );
}
