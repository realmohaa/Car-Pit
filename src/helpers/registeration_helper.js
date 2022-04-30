import axios from 'axios';
import { errNotification, sucessNotification } from '../utils/toasts';

export const handleRegister = async (e, params, callback) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", params.username)
    data.append("email", params.email)
    data.append("first_name", params.firstName)
    data.append("last_name", params.lastName)
    data.append("password", params.password)
    data.append("profile_image", params.profilePic)

    try {
      if(params.verifiedPass !== params.password){
        errNotification("Password doesn't match")
      } else {
        const instance = new axios.create({
          baseURL:"http://localhost:6000/api",
          headers: {
            "Content-Type": "multipart/form-data; Boundary:anyBoundary",
            "Access-Control-Allow-Origin": "*"
          }
        })
        await instance.post('/auth/register', data).then(res => {
          sucessNotification("Sign Up Sucess");
          callback(res)
          setProfilePic(null);
        })
      }
    } catch (err){
      err.response && errNotification(err.response.data?.error.message)
    }
}