import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import dossierService from '../../api/dossierService';
import { Dossier } from '../../types/Dossier';
import ToastConfig from '../../types/Toast';
import { DossierOrganism } from '../organisms';

interface Props {
  idDossier?: string;
  goToHome: () => void;
}

export default function DossierContainer({ idDossier, goToHome }: Props) {
  const [dossier, setdossier] = useState<Dossier | undefined>(undefined);

  const infoDossier = useCallback(async () => {
    const data = await dossierService.getInfoDossierById(idDossier!);
    if (data.succes) {
      setdossier(data.data as Dossier);
      console.log(data.data);
    } else {
      toast(data.data, ToastConfig.ERROR);
      goToHome();
    }
  }, [idDossier, goToHome]);

  useEffect(() => {
    if (
      !Number.isInteger(Number(idDossier)) ||
      Math.sign(Number(idDossier)) !== 1
    ) {
      goToHome();
    } else {
      infoDossier();
    }
  }, [idDossier, goToHome, infoDossier]);

  const postOnlyFile = async (files: any) => {
    const data = await dossierService.postFileOnDossier(idDossier!, files);
    if (data.succes) {
      setdossier(data.data as Dossier);
      toast('Les Fichiers ont Bien été Upload', ToastConfig.SUCCESS);
    } else {
      toast(data.data, ToastConfig.ERROR);
    }
  };

  const onEditDossier = async (values: any) => {
    const data = await dossierService.editDossierById(idDossier!, values);
    if (data.succes) {
      setdossier(data.data as Dossier);
      toast('Champs mis à jour', ToastConfig.SUCCESS);
    } else {
      toast(data.data, ToastConfig.ERROR);
    }
  };

  return (
    <DossierOrganism
      dossier={dossier}
      postOnlyFile={postOnlyFile}
      onEditDossier={onEditDossier}
    />
  );
}
