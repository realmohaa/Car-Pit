import Garage from '../../layouts/Garage';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Axios } from '../../helpers/axios';
import { useRouter } from 'next/router';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import StatsCard from '../../components/cards/StatsCard';
import GarageProfile from '../../components/cards/GarageProfile';

const data = [
  {
    name: 'January',
    Appointment_Sales: 4000,
    Market_Sales: 2400,
    amt: 2400,
  },
  {
    name: 'February',
    Appointment_Sales: 3000,
    Market_Sales: 1398,
    amt: 2210,
  },
  {
    name: 'March',
    Appointment_Sales: 2000,
    Market_Sales: 9800,
    amt: 2290,
  },
  {
    name: 'April',
    Appointment_Sales: 2780,
    Market_Sales: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    Appointment_Sales: 1890,
    Market_Sales  : 4800,
    amt: 2181,
  },
];

const Title = styled.h1`
  color: white;
  font-size: 1.1rem;
  margin:2rem 0 1rem 0;
`
const Container = styled.div`
  justify-content:  space-around;
  margin-left: 8rem;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-left:6rem;
  }
  @media (max-width: 425px) {
    margin-left:5rem;
  }
`

const ChartContainer = styled.div`
backdrop-filter: blur(9px) saturate(200%);
-webkit-backdrop-filter: blur(9px) saturate(200%);
border-radius: 1rem;
color: white
`

const Card = styled.div`
  margin-right: 3.5%;
`
const Slider = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const modal = {
  hidden: {
      x: "10vh",
      opacity: 0
  },
  visible: {
      x: "0",
      opacity: 1,
      transition: { delay: 0.1 }
  }
}
const box = {
  hidden: {
      y: "-10vh",
      opacity: 0
  },
  visible: {
      y: "0",
      opacity: 1,
      transition: { delay: 0.1 }
  }
}

const Index = () => {

  const [ addCarBox, setAddCarBox ] = useState(false);
  const [ registerBox, setRegisterBox] = useState(false);

  const [ services, setServices ] = useState();
  const [ profile, setProfile ] = useState();

  const [ profileBox, setProfileBox ] = useState();
  const [ garage, setGarage ] = useState();

  useEffect( () => {
      Axios.get('/user/garage/services/')
      .then(res=> {
        setServices(res?.data)
      })
      .catch(e=> {
      console.log(e?.response)
      })

      Axios.get('/user/profile/')
      .then(res=> {
        setProfile(res?.data)
      })
      .catch(e=> {
      console.log(e?.response)
      })

      
      Axios.get('/garage/profile/')
      .then(res=> {
        setGarage(res?.data)
      })
      .catch(e=> {
      console.log(e?.response)
      })

  }, [])

  const router = useRouter();

  return (
    <Garage>
      <Container className='w-screen flex xl:flex-row flex-col'>
        <div className='flex-1'>

        <Title>Appointments Details</Title>

        <Slider>
          <Card>
            <StatsCard icon="calendar" name="All Orders" value={21}/>
          </Card>
          <Card>
            <StatsCard icon="pending" name="Pending Orders" value={14}/>
          </Card>
          <Card>
            <StatsCard icon="active" name="Active Orders" value={7}/>
          </Card>
          <Card>
            <StatsCard icon="today" name="Received Today" value={2}/>
          </Card>
        </Slider>

        <Title>Inventory Analytics</Title>
        <Slider>
          <Card>
            <StatsCard icon="sales" name="Total Sales" value="374,645 HUF"/>
          </Card>
          <Card>
            <StatsCard icon="products" name="Total Products" value={23}/>
          </Card>
          <Card>
            <StatsCard icon="category" name="Categories" value={5}/>
          </Card>
          <Card>
            <StatsCard icon="profit" name="Profits" value="184,645 HUF"/>
          </Card>
        </Slider>

        </div>
      </Container>

      <Container className='flex flex-col justify-center'>
      <div className='flex items-start space-x-12'>
        <div className='flex flex-col'>
        <Title>General Information</Title>
        <ChartContainer className='p-8'>
        <LineChart className='text-white' width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="Appointment_Sales" stroke="rgba(28,255,124,.6)" />
          <Line type="monotone" dataKey="Market_Sales" stroke="rgb(228,95,44)" />
          <CartesianGrid stroke="rgba(255,255,255,.5)" strokeDasharray="5 5" />
          <XAxis stroke='#000' dataKey="name" />                                  
          <YAxis stroke='#000'/>
          <Legend />
          <Tooltip />
        </LineChart>
        </ChartContainer>
        </div>
        
        <AnimatePresence className='flex-1' exitBeforeEnter>
          <motion.div 
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className='w-3/4 flex flex-col items-start'>
              <Title>Garage Profile</Title>
              <GarageProfile data={profile} garage={garage}/>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      </Container>
    </Garage>
    )
}

export default Index