import React, { useContext, useEffect, useState } from 'react';
import dossiersService from '../../api/dossiersService';
import { UserContext } from '../../contexts/UserContext';
import { DossiersForToday, SearchDossiers } from '../../types/Dossiers';
import { JwtUserType } from '../../types/UserContext';
import { HomeOrganism } from '../organisms';

const GOOD_LETTERS = 'azertyuiopqsdfghjklmwxcvbnéèîô1234567890';

const fakeData: SearchDossiers = [
  { id: 2341, name: 'Provins' },
  { id: 2951, name: 'Rousseaux' },
  { id: 9462, name: 'DI Environement' },
  { id: 5820, name: 'Cocherot' },
];

interface Props {
  goToLogin: () => void;
}

export default function HomeContainer({ goToLogin }: Props) {
  const [dataForToday, setdataForToday] = useState<DossiersForToday>();
  const [searchData, setsearchData] = useState<SearchDossiers>([]);
  const { userContext, setUserContext } = useContext(UserContext);

  useEffect(() => {
    getInfoForToday();
  }, []);
  const getInfoForToday = async () => {
    const data = await dossiersService.getInfoForToday();
    if (data.succes) {
      setdataForToday(data.data);
    }
  };
  const handleSearchDossier = async (info: string) => {
    if (
      info.length &&
      info.split('').some(el => GOOD_LETTERS.includes(el.toLowerCase()))
    ) {
      const data = await dossiersService.searchDossiers(info);
      if (data.succes) {
        setsearchData(data.data);
      }
    }
  };

  const handleLogout = () => {
    const newUserContext: JwtUserType = { ...userContext };
    delete newUserContext.exp;
    delete newUserContext.token;
    setUserContext(newUserContext);

    goToLogin();
  };

  return (
    <HomeOrganism
      searchData={searchData}
      infosForToday={dataForToday}
      onSearchDossiers={handleSearchDossier}
      dossiersToChange={fakeData}
      onLogout={handleLogout}
    />
  );
}
