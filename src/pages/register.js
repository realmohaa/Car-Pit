import { FaUser, FaLock, FaSignInAlt, FaUserPlus, FaUndo, FaEnvelope, FaAddressCard, FaImage, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AuthCanvas from '../components/AuthCanvas';
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import { useState } from 'react';
import { useRouter } from 'next/router'

const Register = () => {
  const router = useRouter()
  const [value, setValue] = useState();
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
        <div className="flex flex-col text-center items-center justify-center p-4 text-black w-1/2 divide-y">
          <div className="w-full mb-2">

            {/* Welcoming Div */}
            <div className=" pb-4">
              <h1 className="font-medium text-blue-500 text-2xl">Sign Up</h1>
              <p className="text-gray-400 text-md">Create a new account</p>
            </div>

            {/* Login Form */}
            <form className="flex flex-col items-center space-y-4">
              {/* User Inputs */}
              <div className="flex flex-col md:flex-row flex-wrap justify-center items-center align-cetner">
              {/* Profile Image */}
              <div className="py-5 bg-white px-2 w-full">
                  <div className="max-w-full rounded-full overflow-hidden">
                      <div className="md:flex">
                          <div className="w-full relative p-3">
                              <motion.div 
                                className="border h-28 w-28 mx-auto rounded-full border-dashed border-2 border-blue-500 bg-gray-100 flex justify-center items-center"
                                whileHover={{
                                  scale: 1.1,
                                  tranition: {
                                      duration: .2
                                  }
                                }}
                                whileFocus={{
                                  scale: 0.95,
                                  backgroundColor: 'transparent',
                                  color: 'gray',
                                  border: '3px solid gray'
                                }}
                              >
                                  <div className="absolute">
                                      <div className="flex flex-col items-center">
                                        <FaImage className="text-blue-500 text-3xl"/>
                                      </div>
                                  </div> 
                                  <input type="file" className="h-full w-full opacity-0" name=""/>
                              </motion.div>
                          </div>
                      </div>
                  </div>
              </div>

                {/* Username Input */}
                <div className="relative m-2">
                  <span className="absolute flex inset-y-0 items-center pl-4 text-gray-400">
                    <FaUser/>
                  </span>
                  <input className="border border-gray-300 outline-none placeholder-gray-400 pl-10 pr-2 pt-2 pb-2 rounded-xl tansition focus:ring-2 focus:ring-blue-500" placeholder="Username" type="text"/>
                </div>

                {/* Email Input */}
                <div className="relative m-2">
                  <span className="absolute flex inset-y-0 items-center pl-4 text-gray-400">
                    <FaEnvelope/>
                  </span>
                  <input className="border border-gray-300 outline-none placeholder-gray-400 pl-10 pr-2 pt-2 pb-2 rounded-xl tansition focus:ring-2 focus:ring-blue-500" placeholder="Email" type="email"/>
                </div>

                {/* First Name */}
                <div className="relative m-2">
                  <span className="absolute flex inset-y-0 items-center pl-4 text-gray-400">
                    <FaAddressCard/>
                  </span>
                  <input className="border border-gray-300 outline-none placeholder-gray-400 pl-10 pr-2 pt-2 pb-2 rounded-xl tansition focus:ring-2 focus:ring-blue-500" placeholder="First Name" type="text"/>
                </div>

                {/* Email Input */}
                <div className="relative m-2">
                  <span className="absolute flex inset-y-0 items-center pl-4 text-gray-400">
                    <FaAddressCard/>
                  </span>
                  <input className="border border-gray-300 outline-none placeholder-gray-400 pl-10 pr-2 pt-2 pb-2 rounded-xl tansition focus:ring-2 focus:ring-blue-500" placeholder="Last Name" type="text"/>
                </div>

                {/* Password Input */}
                <div className="relative m-2">
                  <span className="absolute flex inset-y-0 items-center pl-4 text-gray-400">
                    <FaLock/>
                  </span>
                  <input className="border border-gray-300 outline-none placeholder-gray-400 pl-10 pr-2 pt-2 pb-2 rounded-xl tansition focus:ring-2 focus:ring-blue-500" placeholder="Password" type="password"/>
                </div>

                {/* Confirm Password Input */}
                <div className="relative m-2">
                  <span className="absolute flex inset-y-0 items-center pl-4 text-gray-400">
                    <FaUndo/>
                  </span>
                  <input className="border border-gray-300 outline-none placeholder-gray-400 pl-10 pr-2 pt-2 pb-2 rounded-xl tansition focus:ring-2 focus:ring-blue-500" placeholder="Confirm Password" type="password"/>
                </div>

                {/* Password Input */}
                <div className="relative m-2">
                  <PhoneInputWithCountrySelect 
                    className="border border-gray-300 outline-none placeholder-gray-400 pl-4 pr-2 pt-2 pb-2 rounded-xl tansition focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone Number"
                    type="password"
                    value={value}
                    onChange={setValue}/>
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
              <motion.button 
                className="bg-blue-500 font-medium inline-flex items-center px-6 py-2 rounded-xl text-white"
                whileHover={{
                  scale: 1.1,
                  tranition: {
                      duration: .2
                  }
                }}
                whileFocus={{
                  scale: 0.95,
                  backgroundColor: 'transparent',
                  color: 'gray',
                  border: '3px solid gray'
                }}
                >
                <FaUserPlus className="mr-2"/>Create Account
              </motion.button>
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