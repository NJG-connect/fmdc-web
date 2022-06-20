import { ToastOptions } from 'react-toastify';

interface ToastType {
  SUCCESS: ToastOptions;
  ERROR: ToastOptions;
  INFO: ToastOptions;
}

const defaultConfig = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const ToastConfig: ToastType = {
  SUCCESS: { ...defaultConfig, type: 'success' },
  ERROR: { ...defaultConfig, type: 'error' },
  INFO: { ...defaultConfig, type: 'info' },
};

export default ToastConfig;
