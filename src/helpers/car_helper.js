import { errNotification, sucessNotification } from '../utils/toasts';
import { Axios } from './axios';

export const addCar = async (e, vin, setLoading, callback) => {
    e.preventDefault();
    setLoading(true)
    try {
      await Axios.post(`/user/cars?vin=${vin}`)
        .then(res=> {
          if(res.status === 200){
            sucessNotification("Your Vehicle is added");
          } else if(res.status === 208) {
            errNotification("This vehicle is already added")
          }
          callback(res)
        }).catch(e => {
          if(e.response.status === 404) {
            errNotification("We couldn't find your vehicle")
          }
        })
        setLoading(false)
    } catch (e) {
      errNotification("Something went wrong!")
      console.log(e)
    }
}