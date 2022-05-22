import User from '../../layouts/User';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Axios } from '../../helpers/axios';
import { motion } from 'framer-motion'
import Image from 'next/image'
import moment from 'moment'
import { Chip } from '@mui/material';
import QRCode from "react-qr-code";
import Router from 'next/router';
import Link from 'next/link'
import { errNotification, sucessNotification } from '../../utils/toasts';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import { MdOutlineFreeCancellation, MdOutlineEditCalendar } from 'react-icons/md'

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
  const [loading, setLoading] = useState();

  const handleDelete = async (orderId) => {
    setLoading(true)
    await Axios.delete(`/user/order/` + orderId).then(res => {
      sucessNotification("Appointment Canceled")
    }).catch(e => {
      errNotification("Error Occured while deleting")
      Router.reload(window.location.pathname);
    })
    setLoading(false)
  }

  useEffect(() => {
    Axios.get('/user/order/').then(res => {
      return setOrders(res.data)
    })
  }, [])
  
  return (
    <User>
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
                  <Actions className='space-x-4 space-y-6'>
                        <LoadingButton
                          onClick={() => handleDelete(order.order_id)}
                          startIcon={<MdOutlineFreeCancellation />}
                          loading={loading}
                          loadingPosition="end"
                          variant="contained"
                          className='rounded-xl px-6 py-2 hover:scale-105 bg-black text-base capitalize text-[rgba(255,255,255,.5)] hover:bg-red-600 hover:text-white transition-all duration-150'
                      >
                          Cancel
                      </LoadingButton>
                      <Button
                          onClick={() => handleReschedule(order.order_id)}
                          startIcon={<MdOutlineEditCalendar />}
                          variant="contained"
                          className='rounded-xl px-6 py-2 hover:scale-105 bg-black text-base capitalize text-[rgba(255,255,255,.5)] hover:bg-blue-600 hover:text-white transition-all duration-150'
                      >
                          Reschedule
                      </Button>
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
    </User>
  )
}

export default Appointments