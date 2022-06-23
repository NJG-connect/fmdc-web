import eye from './eye.svg';
import closedEye from './eye-2.svg';

export type ImageType =
  | 'logoAndBrand'
  | 'logoNjgConnect'
  | 'background'
  | 'road'
  | 'calendar'
  | 'contact'
  | 'addFolder'
  | 'logout'
  | 'folder'
  | 'eye'
  | "closedEye"

const images: { [key in ImageType]: any } = {
  logoAndBrand: require('./logoAndBrand.png'),
  logoNjgConnect: require('./logoNjgConnect.png'),
  background: require('./background.png'),
  road: require('./road.png'),
  calendar: require('./calendar.png'),
  contact: require('./contact.png'),
  folder: require('./folder.png'),
  addFolder: require('./add-folder.png'),
  logout: require('./logout.png'),
  eye,
  closedEye
};

export default images;
