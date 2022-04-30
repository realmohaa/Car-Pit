import Garage from '../../layouts/Garage';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Axios } from '../../helpers/axios';
import Button from '../../components/buttons/Button';
import { motion } from 'framer-motion'
import Image from 'next/image'
import moment from 'moment'
import {Chip} from '@mui/material';
import QRCode from "react-qr-code";
import Router from 'next/router';
import Link from 'next/link'

import { errNotification, sucessNotification } from '../../utils/toasts';

const Container = styled.div`
    backdrop-filter: blur(8px) saturate(180%);
    -webkit-backdrop-filter: blur(8px) saturate(200%);
    border-radius: 1rem;
    color: white
`
const CarDetails = styled.div``
const CarName = styled.h1`
    font-size: 1.5rem;
    padding: 1rem 0;
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
  const [new_date, setNewDate] = useState();

  const handleDelete = async (orderId) => {
    await Axios.delete(`/user/order/` + orderId).then(res => {
      sucessNotification("Appointment Canceled")
    }).catch(e => {
      errNotification("Error Occured while deleting")
      Router.reload(window.location.pathname);
    })
  }

    const handleReschedule = async (orderId) => {
    await Axios.delete(`user/order/reschedule/` + orderId, new_date).then(res => {
      sucessNotification("Appointment Canceled")
    }).catch(e => {
      errNotification("Error Occured while deleting")
      Router.reload(window.location.pathname);
    })
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
              <Container className='flex flex-row justify-between items-center w-5/12 p-6 m-4 space-y-2' key={order.order_id}>
              <CarDetails className='flex-2'>
              <Chip label={order.status} className={order.status}/>
              <CarName>{moment(order.scheduled_date).format('DD MMMM YY HH:mm A')}</CarName>
              <CarStyle>{order.vehicle_info.make + ' ' + order.vehicle_info.model + ' ' + order.vehicle_info.year}</CarStyle>
              <CarStyle className='mt-2'>{order.client_description}</CarStyle>
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
                      <div onClick={() => handleReschedule(order.order_id)}>
                          <Button color="rgba(25,85,205,.4)" title="Reschedule"/>
                      </div>
                  </Actions>
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
    </Garage>
  )
}

export default Appointments