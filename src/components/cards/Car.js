import styled from 'styled-components';
import Image from 'next/image';
import Button from '../../components/buttons/Button'
import { Axios } from '../../helpers/axios';
import FeatureCard from './FeatureCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Router from 'next/router'
import CarHistory from './CarHistory';
import { LoadingButton } from '@mui/lab';
import { MdDeleteOutline, MdInfoOutline } from 'react-icons/md'
import { SiGooglesearchconsole } from 'react-icons/si'

const Container = styled.div`
    backdrop-filter: blur(8px) saturate(180%);
    -webkit-backdrop-filter: blur(8px) saturate(200%);
    border-radius: 1rem;
    color: white
`
const CarDetails = styled.div``
const CarName = styled.h1`
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: bold;
`
const CarStyle = styled.p`
font-size: .8rem;
font-weight: bold;
color: rgba(255,255,255,.7)
`
const Actions = styled.div`
    display: flex;
    justify-content: start;
    align-items: end;
`
const CarImg = styled.div`
text-align: center;
margin-top: 2rem;
positon: absolute;
z-index:90
`

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
const Car = (props) => {
    const [ loading, setLoading ] = useState(false);
    const [ delLoading, setDelLoading ] = useState(false);
    const [ showHistory, setShowHistory] = useState(false)

    const [issueCount, setIssueCount] = useState();
    const [issue, setIssue] = useState();
    
    const [junkAndSalvage, setJunkAndSalvage] = useState();
    const [vinChanged, setVinChanged] = useState();

    const callHistory = async () => {
        setLoading(true)
        await Axios.get('/user/cars/history?vin=' + props.vin).then(res => {
            console.log(res)
            setIssueCount(res.data?.brandsRecordCount);
            setIssue(res.data?.brandsInformation[issueCount]);
            setJunkAndSalvage(res.data?.junkAndSalvageInformation);
            setVinChanged(res.data?.vinChanged)
            setShowHistory(true)
        })
        setLoading(false);
    }

    const handleDelete = async () => {
        setDelLoading(true)
        // await Axios.delete(`/user/cars/?vin=${props.vin}`).then((res) => {
        //     return Router.reload(window.location.pathname);
        // })
        return setDelLoading(false)
    }

    return (
        <Container className='flex flex-row justify-between w-full p-6'>
        <CarDetails className='flex-2'>
        <CarName>{props.name}</CarName>
        <CarStyle>{props.vin}</CarStyle>
        <CarStyle>{props.style}</CarStyle>
        <div>
            {
                showHistory
                ?
                (
                <AnimatePresence exitBeforeEnter>
                    <motion.div 
                    variants={modal}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className='flex flex-col md:flex-row flex-wrap items-center' 
                    >
                        {
                            loading
                            ?
                            (
                                <div className='w-full text-center text-white flex-col justify-center items-center'>
                                <motion.div initial={{scale:1}} animate={{scale:1.02, transition: {
                                    yoyo: Infinity
                                }}} className='opacity-50'>
                                    <h1>This might take few seconds...</h1>
                                    <p>You may use the platform as you wish</p>
                                    </motion.div>
                                </div>
                            )
                            :
                            (<CarHistory issueCount={issueCount} issue={issue} junkAndSalvage={junkAndSalvage} vinChanged={vinChanged}/>)
                        }
                    </motion.div>
                </AnimatePresence>
                )
                :
                (
                <motion.div 
                    variants={modal}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className='flex flex-col md:flex-row flex-wrap h-full' 
                >
                    <FeatureCard icon="gas" title="Fuel capacity" value={props.fuelCapacity}/>
                    {
                    props.cityMileage && (
                        <FeatureCard icon="city" title="City Mileage" value={props.cityMileage}/>
                    )
                    }
                    {
                    props.highwayMileage && (
                        <FeatureCard icon="road" title="Highway Mileage" value={props.highwayMileage}/>
                    )
                    }
                    <FeatureCard icon="cog" title="Transmission" value={props.transmission}/>
                    <FeatureCard icon="chair" title="Seating" value={props.seating}/>
                    <FeatureCard icon="money" title="Launch Price" value={props.launch_price}/>
                    <FeatureCard icon="car" title="Engine" value={props.engine}/>
                    <FeatureCard icon="globe" title="Country Of Origin" value={props.made}/>
                </motion.div>
                )
            }
            <Actions className='space-x-4 space-y-6'>
                <LoadingButton
                        onClick={() => handleDelete()}
                        startIcon={<MdDeleteOutline />}
                        loading={delLoading}
                        loadingPosition="end"
                        variant="contained"
                        className='rounded-xl px-6 py-2 hover:scale-105 bg-black text-base capitalize text-[rgba(255,255,255,.5)] hover:bg-red-600 hover:text-white transition-all duration-150'
                    >
                        Delete Vehicle
                </LoadingButton>
                <LoadingButton
                        onClick={() => callHistory()}
                        startIcon={<SiGooglesearchconsole />}
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                        className='rounded-xl px-6 py-2 hover:scale-105 bg-black text-base capitalize text-[rgba(255,255,255,.5)] hover:bg-green-600 hover:text-white transition-all duration-150'
                    >
                        Vehicle History
                </LoadingButton>
                <LoadingButton
                        onClick={() => setShowHistory(false)}
                        startIcon={<MdInfoOutline />}
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                        className='rounded-xl px-6 py-2 hover:scale-105 bg-black text-base capitalize text-[rgba(255,255,255,.5)] hover:bg-yellow-700 hover:text-white transition-all duration-150'
                    >
                        Vehicle Details
                </LoadingButton>
            </Actions>
        </div>

        </CarDetails>
        <CarImg className='w-full'>
        <motion.div 
            drag="x"
            dragConstraints={{right: 0, left: 0}}
            whileDrag={{rotate: -5, scale:1.1}}
            whileHover={{scale:1.1,rotate: 5,}}
            initial="pageInitial" animate="pageAnimate" exit="pageExit" variants={{
                pageInitial: {
                    x: 1000
                }, 
                pageAnimate: {
                    x: 0,
                    transition: { delay: 0.2 }
                },
            }}
            className='cursor-grab'>
            <div className='pointer-events-none'>
                <Image src={props.img} alt="sdf" width={600} height={450}/>
            </div>
        </motion.div>
        </CarImg>
    </Container>
    )
}

export default Car