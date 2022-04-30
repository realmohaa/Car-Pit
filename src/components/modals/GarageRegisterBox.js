import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Button from '../buttons/Button';
import RequiredInput from '../inputs/RequiredInput';
import { useState } from 'react';
import { addCar } from '../../helpers/car_helper';
import Loader from '../icons/Loader';
import { useRouter } from 'next/router';
import LocationInput from '../inputs/LocationInput';
import { Axios } from '../../helpers/axios';
import { errNotification, sucessNotification } from '../../utils/toasts';;

const Box = styled(motion.div)``

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

const GarageBox = ({ registerBox, services }) => {

    const [ legal_name, setLegalName ] = useState('');
    const [ license_no, setLicense ] = useState('');
    const [ contact_no, setContact ] = useState('');
    const [ country, setCountry ] = useState('');
    const [ region, setRegion ] = useState('');
    const [ street, setStreet ] = useState('');
    const [ postcode, setPostcode ] = useState('');

    const [ loading, setLoading ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        await Axios.post('/user/garage/register', {
            legal_name,
            location: {
                country,
                region,
                street,
                postcode
            },
            services,
            license_no,
            contact_no
        }).then(res => {
            sucessNotification("Application Sent Succesfully");
            setLoading(false)
        }).catch(e => {
            errNotification(e.response?.data.error.message);
        })
        setLoading(false)
    }

    const router = useRouter()

    return ( 
    <AnimatePresence exitBeforeEnter>
    {
        registerBox && (
        <Box 
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        >
            <motion.div
            className='modal'
            variants={modal}
            >
                {
                    loading 
                    ?
                    <div className='w-full flex justify-center items-center'>
                        <Loader/>
                    </div>
                    :
                    (
                    <>
                        <p className='text-gray-300 pb-2'>Please enter the following information to complete the registration procedure</p>
                        <form onSubmit={(e) => handleSubmit(e)} className='flex flex-wrap'>
                            <div className='flex flex-wrap'>
                                <RequiredInput icon="company" value={legal_name} setInput={setLegalName} placeholder="Legal Name"/>
                                <RequiredInput icon="number" value={license_no} setInput={setLicense} placeholder="License No."/>
                                <RequiredInput icon="contact" value={contact_no} setInput={setContact} placeholder="Contact No."/>
                            </div>
                            <LocationInput region={region} setRegion={setRegion} country={country} setCountry={setCountry} />
                            <RequiredInput icon="location" value={street} setInput={setStreet} placeholder="Address"/>
                            <RequiredInput icon="post" value={postcode} setInput={setPostcode} placeholder="Postcode"/>
                            <div className='mt-4 w-full'>
                                <Button title="Send Application"/>
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

export default GarageBox