import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Button from '../buttons/Button';
import RequiredInput from '../inputs/RequiredInput';
import { useState } from 'react';
import { addCar } from '../../helpers/car_helper';
import Loader from '../icons/Loader';
import { useRouter } from 'next/router'

const Box = styled(motion.div)`
    position: relative
`

const backdrop = {
    visible: {  opacity: 1 },
    hidden: { opacity: 0 }
}

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

const AddCarBox = ({ addCarBox }) => {
    const [ vin, setVin ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const router = useRouter()

    return ( 
    <AnimatePresence exitBeforeEnter>
    {
        addCarBox && (
        <Box 
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        >
            <motion.div
            className='modal relative'
            variants={modal}
            >
                {
                    loading 
                    ?
                    <div className='w-full text-center text-white flex-col justify-center items-center'>
                        <Loader/>
                        <motion.div initial={{scale:1}} animate={{scale:1.02, transition: {
                            yoyo: Infinity
                        }}} className='opacity-50'>
                            <h1>This might take few seconds...</h1>
                            <p>You may use the platform as you wish</p>
                        </motion.div>
                    </div>
                    :
                    (
                    <>
                        <div className='flex justify-between'>
                        <p className='text-gray-300'>Please enter you vehicle VIN to proceed</p>
                        </div>
                        <form onSubmit={(e) => addCar(e, vin, setLoading, (result) => {
                            if(result.status === 200) {
                                router.push('/dashboard/cars')
                            }
                        })}>
                            <RequiredInput icon="car" value={vin} setInput={setVin} placeholder="VIN"/>
                            <div className='mt-4'>
                                <Button title="Add Vehicle"/>
                            </div>
                        </form>
                    </>
                    )
                }
            </motion.div>
        </Box>
        )
    }
    </AnimatePresence>
  )
}

export default AddCarBox