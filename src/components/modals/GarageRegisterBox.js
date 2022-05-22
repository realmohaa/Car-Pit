import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import RequiredInput from '../inputs/RequiredInput';
import { useState } from 'react';
import { useRouter } from 'next/router';
import LocationInput from '../inputs/LocationInput';
import { Axios } from '../../helpers/axios';
import { errNotification, sucessNotification } from '../../utils/toasts';
import { LoadingButton } from '@mui/lab';
import { MdSend } from 'react-icons/md'

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
                                <LoadingButton
                                    type='submit'
                                    endIcon={<MdSend />}
                                    loading={loading}
                                    loadingPosition="end"
                                    variant="contained"
                                    className='rounded-xl px-6 py-2 hover:scale-110 bg-blue-500 hover:bg-blue-600 transition-all duration-200'
                                >
                                    Send Application
                                </LoadingButton>
                            </div>
                        </form>
            </motion.div>
        </Box>
        )
    }
    </AnimatePresence>
  )
}

export default GarageBox