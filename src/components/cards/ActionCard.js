import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import Image from 'next/image'

const Container = styled.div`
    width: 100%;
`
const Title = styled.h1`
  color: white;
  font-size: 1.7rem;
  margin:1rem 0;
`
const Card = styled(motion.div)`
    width: 20rem;
    height: 6rem;
    padding: 1rem;
    border-radius: 1rem;
    backdrop-filter: blur(8px) saturate(180%);
    -webkit-backdrop-filter: blur(8px) saturate(200%);
    background-color: rgba(17, 25, 40, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.025);
    position: relative;
    z-index:99;
    cursor: grab;
    margin-top:2rem;
`
const Left = styled(motion.div)`
cursor: grab;
width:8rem;

transition: all .2s ease;
position: absolute;
font-size: 2rem;
top: 15%;
left:1%;
z-index: -1;
color: rgba(255,0,0,.4)
`

const Right = styled(motion.div)`
    position: absolute;
    right: 0;
    top: -60%;
    z-index: 999
`

const CardText = styled.h6`
`

const ActionCard = (props) => {
  return (
    <Container>
        <Title>{props.title}</Title>
        <Card drag="x" dragConstraints={{right: 0, left: 0}}>
            <Left>
                <FaPlus className='ml-2 cursor-pointer animate-spin'/>
            </Left>
            <CardText className='text-sm font-bold text-white mt-7'>{props.name}</CardText>
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
                <Image src={props.img} alt="car" width={330} height={200}/>
            </Right>
        </Card>
    </Container>
  )
}

export default ActionCard