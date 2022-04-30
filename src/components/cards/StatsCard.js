import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
    FcSalesPerformance,
    FcDeployment,
    FcMoneyTransfer,
    FcCalendar,
    FcCameraIdentification,
    FcOvertime,
    FcOk,
    FcInspection,
    FcBullish
} from 'react-icons/fc'

const Container = styled.div`
    width: 50%;
`
const Card = styled(motion.div)`
    width: 20rem;
    height: 6rem;
    padding: .8rem;
    border-radius: 1rem;
    backdrop-filter: blur(8px) saturate(180%);
    -webkit-backdrop-filter: blur(8px) saturate(200%);
    background-color: rgba(17, 25, 40, 0.4);
    border: 4px solid rgba(255, 255, 255, 0.5425);
    position: relative;
    z-index:99;
    cursor: grab;

    @media (max-width: 768px) {
        width: 17rem;
        margin-bottom: 3rem;
    }
    @media (max-width: 425px) {
        width: 19rem;
        margin-bottom: 3rem;
    }
`
const CardText = styled(motion.h6)`
    transform: translate(0,-40%);
    font-size:1.6rem;
    width: 100%;
    line-height: .8;
    color: rgba(255,255,255,.8)
`


const StatsCard = ({name, icon, value}) => {
  return (
    <Container>
        <Card 
            className='flex flex-wrap justify-between'
            drag="x"
            dragConstraints={{right: 0, left: 0}}
            whileHover={{scale: 1.05, x: 20}}
            whileDrag={{rotate: 5}}
        >
            <div className='flex-2'>
                <h2 
                    className='text-sm opacity-50 text-gray-200 cursor-pointer'
                    whileHover={{
                        color: "white",
                    }}
                >
                    {name}
                </h2>
                <CardText 
                    className='text-sm font-bold text-gray-200 mt-4 cursor-pointer'
                    whileHover={{
                        color: "white",
                    }}
                >
                    {value}
                </CardText>
            </div>
            <div 
                className="pointer-events-none flex-1 flex justify-end text-white opacity-75 text-6xl items-center mr-2"
                initial="pageInitial"
                animate="pageAnimate" 
                variants={{
                    pageInitial: {
                        x: 500
                    }, 
                    pageAnimate: {
                        x: 115
                    }
                }}
            >
                {icon === 'calendar' ? (<FcCalendar/>) : null}
                {icon === 'products' ? (<FcDeployment/>) : null}
                {icon === 'sales' ? (<FcMoneyTransfer/>) : null}
                {icon === 'profit' ? (<FcBullish/>) : null}
                {icon === 'category' ? (<FcCameraIdentification/>) : null}
                {icon === 'pending' ? (<FcOvertime/>) : null}
                {icon === 'active' ? (<FcOk/>) : null}
                {icon === 'today' ? (<FcInspection/>) : null}
            </div>
        </Card>
    </Container>
  )
}

export default StatsCard