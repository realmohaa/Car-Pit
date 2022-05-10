import { FaGasPump, FaCity, FaRoad, FaCog, FaChair, FaMoneyBill, FaCarSide, FaGlobe } from 'react-icons/fa';
import { RiCarWashingFill, RiPaintFill } from 'react-icons/ri';
import { MdCarRepair } from 'react-icons/md';
import { GiFlatTire, GiCarDoor, GiNotebook } from 'react-icons/gi';
import moment from 'moment'
import styled from "styled-components";
import { motion } from 'framer-motion';

const NoteCard = (props) => {
  const Container = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0,0,0,.1);
    border-radius: 1rem;
    margin: 1rem;
    padding: .5rem .8rem;
    flex: 1 0 30%;
`
  return (
    <Container whileHover={{scale:1.05}}>
    <div>
    <small className="text-orange-400 text-md font-bold">{props.title}</small>
    <h1 className="text-xl font-medium text-slate-600">{props.value}</h1>
    <div className='flex flex-col space-y-2'>
      <small className="text-gray-300 text-xs">{props.desc}</small>
        {
        props.date
        ?
        (<small className="text-gray-600 font-bold">{moment(props.date).format('D MMMM YYYY')}</small>)
        :
        null
      }
    </div>
    </div>

    <div className='relative ml-2'>
      <GiNotebook className='text-orange-400 text-4xl text-blue-400 opacity-50'/>
      </div>
    </Container>
  )
}

export default NoteCard