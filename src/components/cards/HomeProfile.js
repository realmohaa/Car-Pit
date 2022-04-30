import Image from 'next/image';
import pp from '../../assets/pp.png';
import styled from 'styled-components';
import Button from '../buttons/Button';
import RequiredInput from '../inputs/RequiredInput';
import { Axios } from '../../helpers/axios';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';;
import {FaUser} from 'react-icons/fa'
import { errNotification, sucessNotification } from '../../utils/toasts';
import PhoneInput from '../../components/inputs/PhoneInput'
import PhoneInputWithCountrySelect from 'react-phone-number-input';
const Container = styled.div`
backdrop-filter: blur(8px) saturate(180%);
-webkit-backdrop-filter: blur(8px) saturate(200%);
border: 1px solid rgba(255, 255, 255, 0.025);
`

const HomeProfile = (props) => {
  const router = useRouter();

  const [fName, setFName] = useState();
  const [lName, setLName] = useState();
  const [number, setNumber] = useState();
  const [value, setValue] = useState();

  const handleLogout = async (e) => {
    e.preventDefault();
    await Axios.post('/user/profile/logout');
    router.push('/login')
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    await Axios.put('/user/profile/', {
      first_name: fName,
      last_name: lName,
      phone_number: number,
    }).then(res=> {
      sucessNotification("Profile Updated")
    }).catch(e => {
      errNotification(e.response?.data.error.message)
    })
  }

  useEffect(() => {
  }, [])


  return (
    <Container className="w-full rounded-2xl border border-gray-200 shadow-md dark:border-gray-700">
        <div className="flex items-center flex-wrap w-full">

        <div className='flex flex-col items-end py-4'>
              <div className='text-center px-4'>
              <Image className="mb-3 rounded-full shadow-lg" height={100} width={100} src={pp} alt="Bonnie image"/>
              <h5 className="mb-1 text-xl font-medium text-white my-4">{props.data?.username}</h5>
              <span className="text-sm text-gray-200 opacity-50 font-bold">{props.data?.email}</span>
              </div>
            </div>

            <form className="flex-1 flex ml-2 flex-col grow">
              <div className='flex flex-wrap'>
              <RequiredInput className="placeholder-black" setInput={setFName} update={true} placeholder={props.data?.first_name} icon="name"/>
              <RequiredInput className="placeholder-black" setInput={setLName} update={true} placeholder={props.data?.last_name} icon="name"/>
              <RequiredInput className="placeholder-black" setInput={setNumber} update={true} placeholder={props.data?.phone_number} icon="contact"/>
              <Chip className='m-2 font-bold p-2' color="primary" icon={<FaUser />} label={props.data?.accountType} />
              </div>
              <div className="flex w-full justify-start pt-4 space-x-4">
                <div onClick={(e) => handleUpdate(e)}>
                <Button className="" title="Update"/>
                </div>
                {/* <Button className='bg-blue-400' title="Verify"/> */}
                <div onClick={(e) => handleLogout(e)}>
                  <Button className='bg-red-600' title="Logout"/>
                </div>
              </div>
            </form>


        </div>
</Container>
  )
}

export default HomeProfile