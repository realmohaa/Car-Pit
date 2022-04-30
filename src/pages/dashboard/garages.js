import { useEffect, useState } from "react"
import ProfileCard from "../../components/cards/ProfileCard"
import { Axios } from "../../helpers/axios"
import User from "../../layouts/User"

const Garages = () => {
  const [garages, setGarages] = useState();
  const [userVehicles, setUserVehicles] = useState();

  useEffect(() => {
     Axios.get('/user/garage/').then(res => {
        return setGarages(res.data)
      });
    Axios.get('/user/cars/').then((res) => {
        return setUserVehicles(res.data)
    });
  }, [])

  return (
    <User>
      <div className="flex flex-col md:flex-row flex-wrap space-x-12">
      {
        garages?.map(garage => {
          return (<ProfileCard data={garage} key={garage._id} userVehicles={userVehicles}/>)
        })
      }
      </div>
    </User>
  )
}

export default Garages