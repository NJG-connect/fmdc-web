import React from 'react';

import './circleProgressBar.css';

interface Props {
  color?: string;
  pourcentage: number;
}

const CircleProgressBar: React.FC<Props> = ({ color = "#C83130", pourcentage }) => {
  return (
    <svg className="circle-progress-bar">
      <circle
        cx="56"
        cy="56"
        r="50"
        style={{
          strokeDasharray: `${312 - 312 * ((100 - pourcentage) / 100)} ${312 - 312 * (pourcentage / 100)}`,
          stroke: color
        }}></circle>
    </svg>
  );
};

export default CircleProgressBar;
