import React from 'react';

import './modalContainer.css';
import '../../assets/fonts/index.css';

import { Button, Img } from '../atoms';

interface Props {
  show: boolean;
  name: string;
  onClick?: () => void;
}

const ModalContainer: React.FC<Props> = ({
  show = false,
  name,
  onClick = () => {},
}) => {
  return (
    <div
      className="modal-container"
      style={show ? { display: 'flex' } : { display: 'none' }}>
      <h1>{name}</h1>
      <p>Mon profil</p>
      <div className="button-container">
        <Img img="logout" className="img" />
        <Button className="button" title="Déconnexion" onClick={onClick} />
      </div>
    </div>
  );
};

export default ModalContainer;
