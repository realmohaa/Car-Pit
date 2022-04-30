import User from '../../layouts/User';
import DraggableCarousel from '../../components/cards/DraggableCarousel';
import ActionCard from '../../components/cards/ActionCard';
import CarImg from '../../assets/car2.png';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import AddCarModal from '../../components/modals/AddCarBox';
import GarageBox from '../../components/modals/GarageRegisterBox';
import { motion, AnimatePresence } from 'framer-motion';
import { Axios } from '../../helpers/axios';
import HomeProfile from '../../components/cards/HomeProfile'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useRouter } from 'next/router';

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
const Card = styled.div`
  margin-right: 10%;
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
  }, [])

  const router = useRouter();

  return (
    <User>
      <Container className='w-screen flex xl:flex-row flex-col'>
        <div className='flex-1'>

        <Title>Get Started</Title>

        <Slider>
          <Card onClick={() => { 
            setAddCarBox(!addCarBox)
            setRegisterBox(false)
          }}>
            <ActionCard name="Add Vehicle" img={CarImg} width={340}  height={210}/>
          </Card>
          <Card onClick={() => router.push('/dashboard/cars', undefined, { shallow: true })}>
              <ActionCard name="My Vehicles" img={CarImg} width={340}  height={210}/>
          </Card>
        </Slider>

        <Title>Garages</Title>
        <Slider>
          <Card onClick={() => {
            setRegisterBox(!registerBox)
            setAddCarBox(false)
            }}>
              <ActionCard name="Register Garage" img={CarImg} width={340}  height={210}/>
          </Card>
          <Card onClick={() => {router.push('/dashboard/garages', undefined, { shallow: true })}}>
                <ActionCard name="Available Garages" img={CarImg} width={340}  height={210}/>
          </Card>
        </Slider>

        </div>

        {
          !addCarBox && !registerBox &&
          <AnimatePresence exitBeforeEnter>
            <motion.div 
              className='flex-1'
              variants={modal}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Title>Profile</Title>
              <div className='h-3/4 w-3/4'>
                <HomeProfile data={profile}/>
              </div>
            </motion.div>
          </AnimatePresence>
        }
        {
          addCarBox && (
            <AnimatePresence exitBeforeEnter>
              <motion.div
                className='flex-1'
                variants={box}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className='flex justify-between w-3/4'>
                  <Title>Add Your Vehicle</Title>
                  <div>
                  </div>
                  <Title onClick={() => setAddCarBox(false)} className='opacity-50 cursor-pointer hover:scale-110 hover:text-blue-400 transition-all flex items-center'> <IoMdArrowRoundBack/> Profile</Title>
                </div>
                <div className='h-3/4 w-3/4'>
                  <AddCarModal addCarBox={addCarBox} setAddCarBox={setAddCarBox} />
                </div>
              </motion.div>
            </AnimatePresence>
          )
        }
        {
          registerBox && (
            <AnimatePresence exitBeforeEnter>
              <motion.div
                className='flex-1'
                variants={box}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className='flex justify-between w-3/4'>
                  <Title>Garage Subscription Request</Title>
                  <div>
                  </div>
                  <Title onClick={() => setRegisterBox(false)} className='opacity-50 cursor-pointer hover:scale-110 hover:text-blue-400 transition-all flex items-center'> <IoMdArrowRoundBack/> Profile</Title>
                </div>
                <div className='h-3/4 w-3/4'>
                  <GarageBox services={services} registerBox={registerBox} setRegisterBox={setRegisterBox} />
                </div>
              </motion.div>
            </AnimatePresence>
          )
        }
      </Container>

      {
        console.log(services)
      }

      <Container>
        <DraggableCarousel title="Features"/>
      </Container>
    </User>
    )
}

export default Index