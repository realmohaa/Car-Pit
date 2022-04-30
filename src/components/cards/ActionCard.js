import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image'

const Container = styled.div`
    width: 100%;
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
const Right = styled(motion.div)`
    position: absolute;
    right: -1%;
    top: -65%;
    z-index: 999;

    @media (max-width: 768px) {
        top: -55%;
    }
    @media (max-width: 425px) {
        top: -50%;
        right: 5%;
    }
`
const CardText = styled(motion.h6)`
    transform: translate(0,-40%);
    font-size:1.7rem;
    width: 30px;
    line-height: .8;
    color: rgba(255,255,255,.8)
`

const ActionCard = (props) => {
  return (
    <Container>
        <Card 
            drag="x"
            dragConstraints={{right: 0, left: 0}}
            whileHover={{scale: 1.05, x: 20}}
            whileDrag={{rotate: 5}}
        >
            <CardText 
                className='text-sm font-bold text-gray-200 mt-7 cursor-pointer'
                whileHover={{
                    color: "white",
                }}
            >
                {props.name}
            </CardText>
            <Right 
                className="pointer-events-none"
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
                <Image src={props.img} alt="car" width={props.width} height={props.height}/>
            </Right>
        </Card>
    </Container>
  )
}

export default ActionCard