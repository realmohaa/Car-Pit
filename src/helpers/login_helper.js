import { errNotification, sucessNotification } from '../utils/toasts';
import { Axios } from './axios';

export const handleSubmit = async (e, credentials, callback) => {
    e.preventDefault();
    try {
      await Axios.post('/auth/login', {
        ...credentials
      }).then(res => {
        sucessNotification("Logging In");
        callback(res);
      })
    } catch (err){
        errNotification(err.response?.data.error.message);
        callback(err);
    }
}