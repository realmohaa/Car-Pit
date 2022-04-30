import Image from 'next/image';
import pp from '../../assets/pp.png';
import styled from 'styled-components';
import Button from '../buttons/Button';
import FeatureCard from './FeatureCard';
import { FcGlobe, FcLeft } from 'react-icons/fc'
import { BsStarFill } from 'react-icons/bs'
import { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {DateTimePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import { motion } from 'framer-motion';
import {Box, MenuItem, FormControl, Select, Chip, TextareaAutosize, TextField} from '@mui/material';
import { Axios } from '../../helpers/axios';
import { errNotification, sucessNotification } from '../../utils/toasts';

const Container = styled(motion.div)`
backdrop-filter: blur(8px) saturate(180%);
-webkit-backdrop-filter: blur(8px) saturate(200%);
border: 1px solid rgba(255, 255, 255, 0.025);
`
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ProfileCard = ({data, userVehicles}) => {
  // Needed Info States
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedCar, setSelectedCar] = useState();
  const [serv, setServ] = useState([]);
  const [issue, setIssue] = useState();

  // Triggering Changes
  const [showOrder, setShowOrder] = useState(false)
  const [submit, showSubmit] = useState(true)

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setServ(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  // Date Picker Disabling Weekend
  const disableWeekends = (date) => {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  console.log(selectedCar)

  const handleAppointment = async (e) => {
    e.preventDefault();

    await Axios.post('/user/order', {
      garage_id: data.garage_id,
      client_description: issue,
      scheduled_date: selectedDate,
      services: serv,
      vehicle_info: selectedCar
    }).then(res => {
      sucessNotification("Sent Successfully!")
      setShowOrder(false)
      showSubmit(true)
    }).catch(e => {
      errNotification(e.response?.data.error.message)
    });

  }

  return (
    <Container initial="pageInitial" animate="pageAnimate" exit="pageExit" variants={{
      pageInitial: {
        y: -50
      }, 
      pageAnimate: {
        y: 20
      },
      pageExit: {
        backgroundColor: "black",
        opacity: 0
      }
    }} className="max-w-sm rounded-lg border border-gray-200 shadow-md dark:border-gray-700">
        <div className="flex flex-col w-full pt-8">
            <div className='flex flex-col items-center space-y-2'>
              {
                showOrder ?
                (
                  <a onClick={() => {
                    setShowOrder(false)
                    showSubmit(true)
                  }} 
                  className='absolute left-4 cursor-pointer hover:scale-110 hover:text-black transition top-4'>
                    <FcLeft className='text-white text-2xl'/>
                  </a>
                )
                :
                null
              }
              <Image className="mb-3 rounded-full shadow-lg" height={100} width={100} src={pp} alt="Bonnie image"/>
              <h5 className="mb-1 text-xl font-medium text-white my-4">{data.legal_name}</h5>
              <span className="text-sm text-gray-200 opacity-50 font-bold flex items-center"><FcGlobe className='text-xl mr-2'/> {data.location.country + ' - ' + data.location.region}</span>
              <span className="text-sm text-gray-200 opacity-50 font-bold flex items-center"><BsStarFill className='text-lg mr-2'/>3.5</span>
            </div>
            {
              submit
              ?
              <h5 className="mb-1 text-xl text-gray-700 opacity-80 font-medium dark:text-white px-4 pt-6">Services:</h5>
              :
              null
            }
            <div className="flex flex-wrap justify-center p-4">
              {
                submit 
                ?
                data?.services.map(service => {
                  return (<FeatureCard icon={service?.prefix} value={service.service_name} key={service?.prefix}/>)
                })
                :
                null
              }
              {
                showOrder ?
                (
                  <div className='py-6 w-screen relative'>
                  <FormControl className='w-full space-y-4'>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <label id="date" className='text-white text-sm'>Select Date</label>
                      <DateTimePicker 
                        labelId="date"
                        shouldDisableDate={disableWeekends}
                        disablePast
                        minutesStep={60}
                        autoOk={true} 
                        placeholder="Select Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </MuiPickersUtilsProvider>

                    <label id="multiple-chip-label" className='text-white text-sm'>Select Vehicle</label>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      className="px-4 py-2"
                      onChange={(e)=>setSelectedCar(e.target.value)}
                      value={selectedCar}
                    >
                      {userVehicles?.map((vehicle) => {
                        return (
                          <MenuItem
                            key={vehicle._id}
                            className="pl-4  hover:bg-red-400 transition-all"
                            value={vehicle}
                          >
                            {vehicle.make + ' ' + vehicle.model + ' ' + vehicle.year}
                          </MenuItem>
                        )
                      })}
                    </Select>

                    <label id="multiple-chip-label" className='text-white text-sm'>Select Services</label>
                    <Select
                      labelId="multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={serv}
                      onChange={handleChange}
                      renderValue={(selected) => (
                        <Box className="flex flex-wrap space-x-2 p-2 ml-2">
                          {selected.map((value) => (
                            <Chip className='bg-blue-400 text-gray-800 font-bold mb-2' key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {data.services.map((service) => {
                        return (
                          <MenuItem
                          key={service.prefix}
                          value={service.service_name}
                        >
                          {service.service_name}
                        </MenuItem>
                        )
                      })}
                    </Select>

                    <label id="issue" className='text-white text-sm'>Describe Issue</label>
                    <TextareaAutosize
                      labelId="issue"
                      className='border w-full border-gray-300 outline-none placeholder-gray-400 pl-4 pr-8 pt-2 pb-2 rounded-xl tansition focus:ring-2 focus:ring-blue-500'
                      aria-label="empty textarea"
                      placeholder="Issue"
                      minRows={2}
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                    />
                    <div onClick={(e) => handleAppointment(e)} className='text-center'>
                      <Button className="text-center" color="rgba(0,225,0,.5)" title="Submit Appointment"/>
                    </div>
                  </FormControl>
                  </div>
                )
                :
                null
              }
            </div>
            {
              submit
              ?
              <div className="flex flex-col justify-center items-center space-x-3 lg:mt-6 pb-6">
                <div onClick={() => 
                      {
                        setShowOrder(!showOrder)
                        showSubmit(false)
                      }
                  }>
                  <Button color="rgba(0,225,0,.5)" title="Schedule Appointment"/>
                </div>
              </div>
            :
            null
            }
        </div>
    </Container>
  )
}

export default ProfileCard