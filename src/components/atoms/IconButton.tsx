import React from 'react';

import { Img } from './';

interface Props {
  img:
    | 'logoAndBrand'
    | 'logoNjgConnect'
    | 'background'
    | 'road'
    | 'calendar'
    | 'contact'
    | 'addFolder'
    | 'logout'
    | 'folder';
  className: string;
  onClick?: () => void;
  disabled?: boolean;
}

const IconButton: React.FC<Props> = ({
  img,
  className = '',
  onClick,
  disabled = false,
}) => {
  return (
    <div className={`${className} ${disabled && "disabled"}`} onClick={() => !disabled && onClick?.() }>
      <Img img={img} />
    </div>
  );
};

export default IconButton;
