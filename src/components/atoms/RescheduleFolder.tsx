import { render } from '@testing-library/react';
import React from 'react';

import images from '../../assets/images/';
import "./rescheduleFolder.css"

interface Props {
  id: number;
  name: string;
}

const RescheduleFolder: React.FC<Props> = ({ id, name }) => {
  return (
    <div className="rescheduleFolder-container">
      <p>{`${id} - ${name}`}</p>
      <div style={{ backgroundImage: `url(${images.folder})` }}></div>
    </div>
  );
};

export default RescheduleFolder;
