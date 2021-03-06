import { toast } from 'react-toastify';

export const sucessNotification = (msg) => toast.success(msg, {
    position: toast.POSITION.TOP_LEFT,
    autoClose: 300,
    pauseOnHover: false,
    pauseOnFocusLoss: false
  });

export const errNotification = (msg) => toast.error(msg, {
    position: toast.POSITION.TOP_LEFT,
    autoClose: 3500,
    pauseOnHover: false,
    pauseOnFocusLoss: false
});