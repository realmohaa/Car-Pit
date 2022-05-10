import Garage from '../../layouts/Garage';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Axios } from '../../helpers/axios';
import Button from '../../components/buttons/Button';
import { motion } from 'framer-motion'
import Image from 'next/image'
import moment from 'moment'
import QRCode from "react-qr-code";
import Router from 'next/router';
import DateFnsUtils from '@date-io/date-fns';
import {DateTimePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import {Chip, TextField} from '@mui/material';
import { errNotification, sucessNotification } from '../../utils/toasts';
import { FcBusinessman, FcBusinessContact, FcAutomotive, FcPlanner } from 'react-icons/fc'
import NoteCard from '../../components/cards/NoteCard';

const Container = styled.div`
    backdrop-filter: blur(8px) saturate(180%);
    -webkit-backdrop-filter: blur(8px) saturate(200%);
    border-radius: 1rem;
    color: white
`
const CarDetails = styled.div``
const CarName = styled.h1`
    font-size: 1.5rem;
    padding: .5rem 0;
    text-transform: uppercase;
    font-weight: bold;
`
const CarStyle = styled.p`
font-size: .8rem;
font-weight: bold;
color: rgba(255,255,255,.7)
`
const Actions = styled.div`
    display: flex;
    justify-content: start;
    align-items: end;
    div {
        margin:2rem 1rem 1rem 0;
    }
`
const CarImg = styled.div`
text-align: center;
margin-top: 2rem;
positon: absolute;
z-index:90
`

const Appointments = () => {

  const [orders, setOrders] = useState();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDelete = async (orderId) => {
    await Axios.delete(`/user/order/` + orderId).then(res => {
      sucessNotification("Appointment Canceled")
    }).catch(e => {
      errNotification("Error Occured while deleting")
      Router.reload(window.location.pathname);
    })
  }

    const handleReschedule = async (orderId, selectedDate) => {
    await Axios.put(`user/order/reschedule/` + orderId, {new_date: selectedDate}).then(res => {
      console.log(res)
      setShowPicker(!showPicker)
    }).catch(e => {
      errNotification("Error Occured while deleting")
      Router.reload(window.location.pathname);
    })
  }

    // Date Picker Disabling Weekend
    const disableWeekends = (date) => {
      return date.getDay() === 0 || date.getDay() === 6;
    }

  useEffect(() => {
    Axios.get('/garage/orders/').then(res => {
      return setOrders(res.data)
    })
  }, [])
  
  return (
    <Garage>
      <div className='flex flex-wrap justify-start'>
        {
          orders?.slice(0).reverse().map(order => {
            return (
              <Container className='flex flex-row justify-between items-center w-5/12 px-6 py-2 m-4' key={order.order_id}>
              <CarDetails className='flex-2'>
              <Chip label={order.status} className={"mt-2 " + order.status}/>
              <CarName className='inline-flex items-center'><FcPlanner  className='mr-2'/>{moment(order.scheduled_date).format('DD MMMM YY HH:mm A')}</CarName>
              <div className='flex flex-col'>
              <CarStyle className='inline-flex items-center'><FcBusinessman className='text-lg mr-2'/>{order.user.username}</CarStyle>
              <CarStyle className='inline-flex items-center'><FcBusinessContact className='text-lg mr-2'/>{order.user.phone}</CarStyle>
              <CarStyle className='inline-flex items-center'><FcAutomotive className='text-lg mr-2'/>{order.vehicle_info.make + ' ' + order.vehicle_info.model + ' ' + order.vehicle_info.year}</CarStyle>
              </div>
              <div className='pt-4'>
                <div className='bg-white rounded-lg p-2 w-fit'>
                    <QRCode value={order.order_id} size="120"/>
                </div>
                  <div className='flex flex-col md:flex-row flex-wrap mt-4 space-x-2'>
                      {
                        order?.services.map(service => {
                          return (<Chip color="error" className='mt-2' label={service} key={service}/>)
                        })
                      }
                  </div>
                  <Actions>
                      <div onClick={() => handleDelete(order.order_id)}>
                          <Button color="rgba(10,10,10,.8)" title="Cancel"/>
                      </div>
                      <div onClick={() => {
                        setShowPicker(!showPicker)
                        }}>
                          <Button 
                            color="rgba(25,85,205,.4)"
                            title="Reschedule"/>
                      </div>
                      <div className='absolute bottom-0 right-0'>
                          <Button color="rgba(10,10,10,.8)" title="Manage Order"/>
                      </div>
                  </Actions>
              </div>
              <div className='absolute top-0 right-0 w-1/3'>
              <NoteCard title="Client Note" icon="note" desc={order.client_description} className='mt-2'/>
              </div>
              </CarDetails>
              <CarImg className='w-full'>
              <motion.div 
                  drag="x"
                  dragConstraints={{right: 0, left: 0}}
                  whileDrag={{rotate: -5, scale:1.1}}
                  whileHover={{scale:1.1,rotate: 5,}}
                  initial="pageInitial" animate="pageAnimate" exit="pageExit" variants={{
                      pageInitial: {
                        x: 1000
                      }, 
                      pageAnimate: {
                        x: 0,
                        transition: { delay: 0.2 }
                      },
                  }}
                  className='cursor-grab'>
                  <div className='pointer-events-none'>
                      <Image src={order.vehicle_info.img} alt="sdf" width={550} height={400}/>
                  </div>
              </motion.div>
              </CarImg>
          </Container>
            )
          })
        }
      </div>
          <MuiPickersUtilsProvider className="z-90" utils={DateFnsUtils}>
          <DateTimePicker 
            open={showPicker}
            onAbort={() => setShowPicker(!showPicker)}
            onClose={() => setShowPicker(!showPicker)}
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
    </Garage>
  )
}

export default Appointments