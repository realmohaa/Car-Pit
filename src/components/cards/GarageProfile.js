import Image from 'next/image';
import pp from '../../assets/garage.png';
import styled from 'styled-components';
import RequiredInput from '../inputs/RequiredInput';
import { Axios } from '../../helpers/axios';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { FcApproval,FcGlobe,FcAnswers,FcManager } from 'react-icons/fc'
import { errNotification, sucessNotification } from '../../utils/toasts';
import { Box, MenuItem, FormControl, Select, Chip, TextareaAutosize, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MdUpdate, MdLogout } from 'react-icons/md'

const Container = styled.div`
backdrop-filter: blur(8px) saturate(180%);
-webkit-backdrop-filter: blur(8px) saturate(200%);
border: 1px solid rgba(255, 255, 255, 0.025);
`

const GarageProfile = (props) => {
  const router = useRouter();

  const [fName, setFName] = useState();
  const [lName, setLName] = useState();
  const [number, setNumber] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();

  const [logoutLoad, setLogout] = useState(false);
  const [updateLoad, setUpdate] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    setLogout(true)
    await Axios.post('/user/profile/logout').then(() => {
      return setLogout(false)
    });
    return router.push('/')
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdate(true)
    await Axios.put('/user/profile/', {
      username,
      email,
      first_name: fName,
      last_name: lName,
      phone_number: number,
    }).then(res=> {
      sucessNotification("Profile Updated")
    }).catch(e => {
      errNotification(e.response?.data.error.message)
    })
    setUpdate(false)
  }

  useEffect(() => {
  }, [])


  return (
    <Container className="w-full rounded-2xl border border-gray-200 shadow-md dark:border-gray-700">
        <div className="flex items-start flex-wrap w-full px-5">
            <form className="flex-1 flex flex-col">
              <h5 className="mb-1 text-xl font-medium text-white my-4  inline-flex items-center"><FcManager className='mr-2'/>{props.garage?.legal_name}</h5>
              <span className="text-sm text-gray-200 opacity-70 font-bold inline-flex items-center"><FcGlobe className='mr-2'/>{props.garage?.location.country + ' - ' + props.garage?.location.region}</span>
              <span className="text-sm text-gray-200 opacity-50 font-bold inline-flex items-center"><FcAnswers className='mr-2'/>{props.garage?.license_no}</span>
              <div className='flex flex-col flex-wrap mt-2'>
                <div className='flex'>
                <RequiredInput className="placeholder-black" setInput={setUsername} update={true} placeholder={props.data?.username} icon="user"/>
                <RequiredInput className="placeholder-black" setInput={setEmail} update={true} placeholder={props.data?.email} icon="email"/>
                </div>
                <div className='flex'>
                <RequiredInput className="placeholder-black" setInput={setFName} update={true} placeholder={props.data?.first_name} icon="name"/>
                <RequiredInput className="placeholder-black" setInput={setLName} update={true} placeholder={props.data?.last_name} icon="name"/>
                </div>
                <div className='flex'>
                <RequiredInput className="placeholder-black" setInput={setNumber} update={true} placeholder={props.data?.phone_number} icon="contact"/>
                </div>
                <div className='flex space-x-2 mt-4'>
                {
                props.garage?.services.map(service => {
                  return (<Chip icon={<FcApproval/>} color="primary" label={service.service_name} key={service?.prefix}/>)
                })
                }
                </div>
              </div>
              <div className="flex w-full justify-start py-4 space-x-4">
                <div className="flex w-full justify-start pt-4 space-x-4">
                  <LoadingButton
                    onClick={(e) => handleUpdate(e)}
                    endIcon={<MdUpdate />}
                    loading={updateLoad}
                    loadingPosition="end"
                    variant="contained"
                    disabled={!username || !email}
                    className='rounded-xl px-6 py-2 hover:scale-110 bg-blue-500 hover:bg-blue-600 transition-all duration-200'
                  >
                  Update
                </LoadingButton>

                <LoadingButton
                  onClick={(e) => handleLogout(e)}
                  endIcon={<MdLogout />}
                  loading={logoutLoad}
                  loadingPosition="end"
                  variant="contained"
                  className='rounded-xl px-6 py-2 hover:scale-110 bg-blue-500 hover:bg-blue-600 transition-all duration-200'
                  >
                  Logout
                </LoadingButton>
              </div>
              </div>
            </form>
            <div className='flex flex-1 flex-col items-end py-4 grow'>
              <div className='text-center px-12'>
              <Image className="mb-3 shadow-lg" height={600} width={600} src={pp} alt="Bonnie image"/>
              </div>
            </div>
        </div>
  </Container>
  )
}

export default GarageProfile