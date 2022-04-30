import axios from "axios"

export const Axios = new axios.create({
    baseURL:"http://localhost:6000/api",
    withCredentials: true,
    credentials:'include',
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    }
})