import React, { useState } from 'react';
import images, { ImageType } from '../../assets/images';

import './interventionCollapse.css';

interface Props {
  children?: React.ReactNode | JSX.Element | null;
  title?: string;
  onClick?: () => void;
  rightIcon?: ImageType;
  className?: string;
}
export default function InterventionCollapse({
  children,
  className = '',
  title,
  onClick,
  rightIcon,
}: Props) {
  const [isOpen, setisOpen] = useState(true);
  return (
    <div className="interventionCollapse-container">
      <div className="interventionCollapse-header">
        <div className="interventionCollapse-bloc">
          <img
            alt="collapse"
            className={`interventionCollapse-icon-switch ${
              isOpen ? 'interventionCollapse-icon-open' : ''
            }`}
            src={images.arrowDown}
            onClick={() => setisOpen(!isOpen)}
          />
          <p className="interventionCollapse-title">{title}</p>
        </div>
        {rightIcon && (
          <img
            alt="collapse"
            className="interventionCollapse-icon-edit"
            src={images[rightIcon]}
            onClick={onClick}
          />
        )}
      </div>
      <div className={`${className}`}>{isOpen && children}</div>
    </div>
  );
}
