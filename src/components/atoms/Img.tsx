import React from 'react';

import images from '../../assets/images/';

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
