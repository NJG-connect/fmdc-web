import React from 'react';
import { useState } from 'react';

import './homeOrganism.css';
import '../../assets/fonts/index.css';

import { IconButton } from '../atoms';
import { DayInterventions, Reschedule, Select } from '../molecules/';
import { Header } from '../templates/';
import { DossiersForToday, SearchDossiers } from '../../types/Dossiers';

interface Props {
  searchData: SearchDossiers;
  dossiersToChange: SearchDossiers;
  infosForToday: DossiersForToday | undefined;
  onSearchDossiers: (value: string) => void;
  onLogout: () => void;
}

export default function HomeOrganism({
  searchData,
  onSearchDossiers,
  infosForToday,
  dossiersToChange,
  onLogout,
}: Props) {
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <div
      className="home-organism-body"
      onClick={() => isShow && setIsShow(false)}>
      <Header
        title="Soft Enrobé"
        isShow={isShow}
        setIsShow={setIsShow}
        onLogout={onLogout}
      />

      <main className="home-organism-main">
        <Select
          data={searchData}
          onSelect={id => console.log(id)}
          onChange={onSearchDossiers}
        />
      </main>

      <section className="home-organism-bottom">
        <DayInterventions infosForToday={infosForToday} />
        <Reschedule data={dossiersToChange} />
        <DayInterventions infosForToday={infosForToday} />
        <div className="icon">
          <IconButton img="contact" className="img-container" />
          <IconButton img="addFolder" className="img-container" />
        </div>
      </section>
    </div>
  );
}
