import React from 'react';

import "./rescheduleFolder.css"

import { Img } from "../atoms/"

interface Props {
  id: number;
  name: string;
}

const RescheduleFolder: React.FC<Props> = ({ id, name }) => {
  return (
    <div className="rescheduleFolder-container">
      <p>{`${id} - ${name}`}</p>
      <Img img="folder" />
    </div>
  );
};

export default RescheduleFolder;
