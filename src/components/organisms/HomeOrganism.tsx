import React from 'react';

import './homeOrganism.css';
import '../../assets/fonts/index.css';

import { IconButton } from '../atoms';
import { DayInterventions, Reschedule, Select } from '../molecules/';
import { HeaderTemplate } from '../templates/';
import { DossiersForToday, SearchDossiers } from '../../types/Dossiers';

interface Props {
  searchData: SearchDossiers;
  dossiersToChange: SearchDossiers;
  infosForToday: DossiersForToday | undefined;
  onSearchDossiers: (value: string) => void;
  goToDossier: (idDossier: Number) => void;
}

export default function HomeOrganism({
  searchData,
  onSearchDossiers,
  infosForToday,
  dossiersToChange,
  goToDossier,
}: Props) {
  return (
    <HeaderTemplate>
      <main className="home-organism-main">
        <Select
          data={searchData}
          onSelect={id => goToDossier(id)}
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
    </HeaderTemplate>
  );
}
