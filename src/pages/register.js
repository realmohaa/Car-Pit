import { FaSignInAlt, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AuthCanvas from '../components/AuthCanvas';
import 'react-phone-number-input/style.css'
import { useState } from 'react';
import { useRouter } from 'next/router'
import Button from '../components/buttons/Button';
import RequiredInput from '../components/inputs/RequiredInput';
import PhoneInput from '../components/inputs/PhoneInput';
import ProfileImgUpload from '../components/inputs/ProfileImgUpload';
import { toast } from 'react-toastify';
import { handleRegister } from '../helpers/registeration_helper';

toast.configure()
const Register = () => {
  const router = useRouter()
  const [value, setValue] = useState();

  const [profilePic, setProfilePic] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [verifiedPass, setVerifiedPass] = useState('');

  const creationParams = {
    username,
    email,
    firstName,
    lastName,
    password,
    profilePic,
    verifiedPass
  }

  return (
    <>
    {/* Back Button */}
    <div className="relative cursor-pointer">
      <motion.span 
        className="absolute m-6 text-2xl text-blue-500"
        onClick={() => router.back()}
        whileHover={{
          translateX: -5,
          tranition: {
              duration: .2
          }
        }}
      >
        <FaArrowLeft/>
      </motion.span>
    </div>

    {/* Main Container */}
    <main className="block items-center justify-center md:flex">
      {/* Login Card */}
      <div className="flex flex-col justify-evenly max-w-screen overflow-hidden shadow-lg text-white w-full md:flex-row">
        <div className="flex flex-col text-center items-center justify-center p-4 text-black w-full md:w-1/2 divide-y">
          <div className="w-full mb-2">

            {/* Welcoming Div */}
            <div className=" pb-4">
              <h1 className="font-medium text-blue-500 text-2xl">Sign Up</h1>
              <p className="text-gray-400 text-md">Create a new account</p>
            </div>

            {/* Login Form */}
            <form onSubmit={(e) => handleRegister(e, creationParams, (res) => {
              if(res.status === 200 || 201) {
                router.push('/login')
              }
            })} className="flex flex-col items-center space-y-4">
              {/* User Inputs */}
              <div className="flex flex-col md:flex-row flex-wrap justify-center items-center align-cetner">
              {/* Profile Image */}
              <ProfileImgUpload name="profile_image" setFile={setProfilePic}/>
                {/* Username Input */}
                <RequiredInput icon="user" placeholder="Username" type="text" setInput={setUsername}/>
                {/* Email Input */}
                <RequiredInput icon="email" placeholder="Email" type="email" setInput={setEmail}/>
                {/* First Name */}
                <RequiredInput icon="name" placeholder="First Name" type="text" setInput={setFirstName}/>
                {/* Last Name */}
                <RequiredInput icon="name" placeholder="Last Name" type="text" setInput={setLastName}/>
                {/* Passworrd */}
                <RequiredInput icon="pass" placeholder="Password" type="password" setInput={setPassword}/>
                {/* Passworrd */}
                <RequiredInput icon="confirm" placeholder="Confirm Password" type="password"setInput={setVerifiedPass}/>
                {/* Phone Number Input */}
                <div className="relative m-2">
                  <PhoneInput placeholder="Phone Number" value={value} setValue={setValue}/>
                </div>

              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start mb-6">
                {/* CheckBox */}
                <div className="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 outline-none bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" required/>
                </div>
                {/* TCS Reference */}
                <div className="ml-3 text-sm">
                  <label className="font-medium text-gray-900 dark:text-gray-300">
                    I agree with the  
                    <Link href="#" className="text-blue-600 hover:underline"> terms and conditions</Link>
                  </label>
                </div>
              </div>

              {/* Register Button */}
              <Button title="Create Account"/>
            </form>
          </div>

          <div className="w-1/2 mt-2">
            <div className='text-gray-400 text-md m-2 inline-flex'>
              <motion.div className="m-2 flex flex-row justify-center items-center" whileHover={{
                scale: 1.1,
                tranition: {
                  duration: .2
                }}}>
              <FaSignInAlt className="mr-2"/>
                <Link href="/login">Already have an account?</Link>
              </motion.div>
            </div>
          </div>
        </div>

        <AuthCanvas/>
        
      </div>
    </main>
    </>
  )
}

export default Register