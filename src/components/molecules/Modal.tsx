import React from 'react';
import ReactDOM from 'react-dom';
import images from '../../assets/images';

import './modal.css';
interface Props {
  onClose: () => void;
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ title, children, isOpen, onClose }: Props) {
  function close() {
    onClose();
  }
  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <>
      <div className="modalShadow" onClick={close} />
      <div className="modal">
        <div className="modalBanner">
          <p className="modalTitle">{title}</p>
          <img
            onClick={close}
            alt="closeModal"
            src={images.closeIcon}
            className="imgCloseModal"
          />
        </div>
        <div className="modalContent">{children}</div>
      </div>
    </>,
    document.getElementById('app-modal')!,
  );
}
