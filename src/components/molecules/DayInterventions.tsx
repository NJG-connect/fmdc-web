import React from 'react';

import './dayIntervention.css';
import './dailyIntervention.css';

import { CircleProgressBar, Img, Spinner } from '../atoms';
import { DossiersForToday } from '../../types/Dossiers';

interface Props {
  infosForToday: DossiersForToday | undefined;
}

const DayInterventions: React.FC<Props> = ({ infosForToday }) => {
  return (
    <div className="home-intervention-container">
      {!infosForToday ? (
        <Spinner />
      ) : (
        <>
          <div className="top">
            <Img className="img" img="road" />
            <div className="circle-container">
              <CircleProgressBar pourcentage={infosForToday.pourcentFinished} />
              <p>{Math.round(infosForToday.pourcentFinished)}%</p>
            </div>
          </div>
          <div className="bottom">
            <h1>
              <span>{infosForToday.totalIntervention}</span> Intervention du
              jour
            </h1>
            <h3>{infosForToday.date}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default DayInterventions;
