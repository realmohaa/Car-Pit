import { FaGasPump, FaCity, FaRoad, FaCog, FaChair, FaMoneyBill, FaCarSide, FaGlobe } from 'react-icons/fa';
import { RiCarWashingFill, RiPaintFill } from 'react-icons/ri';
import { MdCarRepair } from 'react-icons/md';
import { GiFlatTire, GiCarDoor } from 'react-icons/gi';
import moment from 'moment'
import styled from "styled-components";
import { motion } from 'framer-motion';

const FeatureCard = (props) => {
  const Container = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #FFF;
    border-radius: 1rem;
    padding: 1.5rem;
    margin: 1rem 1rem 0 0;
    flex: 1 0 30%;
`
  return (
    <Container whileHover={{scale:1.05}}>
    <div>
    <small className="text-blue-400 text-xs">{props.title}</small>
    <h1 className="text-xl font-medium text-slate-600">{props.value}</h1>
    <div className='flex flex-col space-y-2'>
      <small className="text-gray-600 text-xs">{props.desc}</small>
        {
        props.date
        ?
        (<small className="text-gray-600 font-bold">{moment(props.date).format('D MMMM YYYY')}</small>)
        :
        null
      }
      <small className="text-gray-600 text-xs">{props.desc}</small>
    </div>
    </div>

    <div className='relative ml-2'>
      {props.icon === 'gas' && (<FaGasPump className='text-black text-4xl text-blue-400 opacity-20'/>) }
      {props.icon === 'city' && (<FaCity className='text-black text-4xl text-blue-400 opacity-20'/>) }
      {props.icon === 'road' && (<FaRoad className='text-black text-4xl text-blue-400 opacity-20'/>) }
      {props.icon === 'cog' && (<FaCog className='text-black text-4xl text-blue-400 opacity-20'/>) }
      {props.icon === 'chair' && (<FaChair className='text-black text-4xl text-blue-400 opacity-20'/>) }
      {props.icon === 'money' && (<FaMoneyBill className='text-black text-4xl text-blue-400 opacity-20'/>) }
      {props.icon === 'car' && (<FaCarSide className='text-black text-4xl text-blue-400 opacity-20'/>) }
      {props.icon === 'globe' && (<FaGlobe className='text-black text-4xl text-blue-400 opacity-20'/>) }
      {props.icon === 'wash' && (<RiCarWashingFill className='text-black text-4xl text-blue-400 opacity-20'/>) }
      {props.icon === 'repair' && (<MdCarRepair className='text-black text-4xl text-blue-400 opacity-20'/>) }
      {props.icon === 'tires' && (<GiFlatTire className='text-black text-4xl text-blue-400 opacity-20'/>) }
      {props.icon === 'care' && (<RiPaintFill className='text-black text-4xl text-blue-400 opacity-20'/>) }
      {props.icon === 'junk' && (<GiCarDoor className='text-black text-4xl text-blue-400 opacity-20'/>) }
      </div>
    </Container>
  )
}

export default FeatureCard