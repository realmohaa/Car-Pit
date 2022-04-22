import Image from "next/image";
import styled from "styled-components";
import { useState, useRef, useEffect } from 'react';
import { motion } from "framer-motion";
import { data } from '../../assets/data';

const Carousel = styled(motion.div)`
  cursor: grab;
  overflow: hidden;
`

const Title = styled.h1`
  color: white;
  font-size: 1.7rem;
  margin:1rem 0;
`

const CarouselItem = styled(motion.div)`
`

const InnerCarousel = styled(motion.div)`
  display: flex;
`

const GetStartedCard = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [width])

  return (
    <Carousel ref={carousel}>
      <Title>Get Started</Title>
      <InnerCarousel drag="x" dragConstraints={{right: 0, left: width}}>
        {data.map(card => {
          return (
            <CarouselItem key={card.id} className="pointer-events-none m-2">
              <Image src={card.imageUrl} alt="sdfsd" width={500} height={500} className="rounded-lg pointer-events-none"/>
            </CarouselItem>
          )
        })}
      </InnerCarousel>
    </Carousel>
  )
}

export default GetStartedCard