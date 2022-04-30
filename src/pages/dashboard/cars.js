import User from "../../layouts/User"
import Car from "../../components/cards/Car"
import { Axios } from '../../helpers/axios';
import { useEffect, useState } from 'react';
import NotFound from "../../components/NotFound";

const Cars = () => {
  
  const [vehicles, setVehicles] = useState();

  useEffect(() => {
      Axios.get('/user/cars/').then((res) => {
          return setVehicles(res.data)
      });
  }, []);

  return (
    <User>
      {
        vehicles?.length != 0 ?
        vehicles?.slice(0).reverse().map((car => {
          return (
            <div className="flex flex-row justify-center p-6" key={car._id}>
              <div className="flex-1">
                <Car 
                  name={car.make + ' ' + car.model + ' ' + car.year}
                  img={car.img}
                  vin={car.vin}
                  style={car.style}
                  fuelCapacity={car.fuel_capacity}
                  cityMileage={car.city_mileage}
                  highwayMileage={car.highway_mileage}
                  transmission={car.transmission_short}
                  engine={car.engine}
                  made={car.made_in}
                  seating={car.standard_seating}
                  launch_price={car.manufacturer_suggested_retail_price}
                />
              </div>
            </div>
          )
        }))
        :
        <NotFound/>
      }
    </User>
  )
}

export default Cars