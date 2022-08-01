import eye from './eye.svg';
import closedEye from './eye-2.svg';
import search from './search.svg';
import backIcon from './backIcon.svg';
import addFile from './addFile.svg';
import closeIcon from './closeIcon.svg';
import addFileOk from './addFileOk.svg';
import edit from './edit.svg';
import arrowDown from './arrowDown.svg';
import closeIconWhite from './closeIconWhite.svg';
import seeDocument from './seeDocument.svg';
import folderIcon from './folderIcon.svg';

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
  | 'closedEye'
  | 'search'
  | 'backIcon'
  | 'closeIcon'
  | 'addFile'
  | 'addFileOk'
  | 'arrowDown'
  | 'edit'
  | 'closeIconWhite'
  | 'seeDocument'
  | 'folderIcon';

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
  closedEye,
  search,
  backIcon,
  addFile,
  closeIcon,
  addFileOk,
  arrowDown,
  edit,
  closeIconWhite,
  seeDocument,
  folderIcon,
};

export default images;
