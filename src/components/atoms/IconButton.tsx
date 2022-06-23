import React from 'react';
import { ImageType } from '../../assets/images';

import { Img } from './';
import images from "../../assets/images/"

interface Props {
  img: ImageType;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  imgClassName?: string;
}

const IconButton: React.FC<Props> = ({
  img,
  className = '',
  onClick,
  disabled = false,
  imgClassName = '',
}) => {
  return (
    <div className={`${className} ${disabled && "disabled"}`} onClick={() => !disabled && onClick?.() }>
      <Img img={img} className={imgClassName} />
    </div>
  );
};

export default IconButton;