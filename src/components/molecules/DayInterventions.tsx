import React from 'react';

import './dayIntervention.css';
import './intervention.css';
import images from '../../assets/images/';

import { CircleProgressBar } from '../atoms';

interface Props {
  date?: Date;
  interventionOfDay?: number;
  maxIntervention?: number;
}

const DayInterventions: React.FC<Props> = ({
  date,
  interventionOfDay = 32,
  maxIntervention = 100,
}) => {
  const pourcent: number = (interventionOfDay / maxIntervention) * 100;

  return (
    <div className="intervention-container">
      <div className="top">
        <div
          className="img"
          style={{ backgroundImage: `url(${images.road})` }}></div>
        <div className="circle-container">
          <CircleProgressBar pourcentage={pourcent} />
          <p>{pourcent}%</p>
        </div>
      </div>
      <div className="bottom">
        <h1>
          <span>12</span> Intervention du jour
        </h1>
        <h3>21/06/2022</h3>
      </div>
    </div>
  );
};

export default DayInterventions;
