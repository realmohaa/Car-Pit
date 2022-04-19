import axios from 'axios';
import { errNotification, sucessNotification } from '../utils/toasts';

export const handleSubmit = async (e, credentials, callback) => {
    e.preventDefault();
    try {
      const instance = new axios.create({
        baseURL:"http://localhost:6000/api",
        withCredentials: true,
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        }
      })
      await instance.post('/auth/login', {
        ...credentials
      }).then(res => {
        sucessNotification("Logging In");
        callback(res);
      })
    } catch (err){
      errNotification(err.response.data.error.message);
      callback(err);
    }
}