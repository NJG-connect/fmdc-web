import React from 'react';

import images, { ImageType } from '../../assets/images/';



interface Props {
  img: ImageType;
  className?: string;
}

const Img: React.FC<Props> = ({ img, className = '' }) => {
  return (
    <div
      className={className}
      style={{ backgroundImage: `url(` + images[img] + `)` }}></div>
  );
};

export default Img;
