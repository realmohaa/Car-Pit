import Image from "next/image";
import styled from "styled-components";
import { useState, useRef, useEffect } from 'react';
import { motion } from "framer-motion";
import { data } from '../../assets/data';
import car from '../../assets/car.png'

const Carousel = styled(motion.div)`
  cursor: grab;
  overflow: hidden;
`
const Title = styled.h1`
  color: white;
  font-size: 1.7rem;
  margin:5rem 0 1rem 0;
`
const CarouselItem = styled(motion.div)`
  flex: 1 0 15%;
`
const InnerCarousel = styled(motion.div)`
  display: flex;
`

const Feature = styled.div`
  backdrop-filter: blur(8px) saturate(180%);
  -webkit-backdrop-filter: blur(8px) saturate(200%);
  border-radius: 1rem;
  color: white;
`

const DraggableCarousel = (props) => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [width])

  return (
    <Carousel ref={carousel}>
      <Title>{props.title}</Title>
      <InnerCarousel className="flex-wrap" drag="x" dragConstraints={{right: 0, left: width}}>
        {data.map(card => {
          return (
            <CarouselItem key={card.id} className="pointer-events-none m-2" drag='x' whileDrag={{rotate: 5}}>
              <Feature className="relative">
                <div className="flex items-center">
                  <div className="flex-1">
                    <h1 className="font-bold text-lg z-50 ml-4 opacity-70">{card.title}</h1>
                  </div>
                  <div className="flex-1">
                  <Image src={card.imageUrl} width={270} height={180}/>
                  </div>
                </div>
              </Feature>
            </CarouselItem>
          )
        })}
      </InnerCarousel>
    </Carousel>
  )
}

export default DraggableCarousel