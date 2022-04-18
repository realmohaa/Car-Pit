import { FaUser, FaLock, FaSignInAlt, FaUserPlus, FaUndo } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

const register = () => {
  return (
    <>
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

              {/* Username Input */}
              <div className="relative">
                <span className="absolute flex inset-y-0 items-center pl-4 text-gray-400">
                  <FaUser/>
                </span>
                <input className="border border-gray-300 outline-none placeholder-gray-400 pl-12 pr-8 pt-2 pb-2 rounded-xl tansition focus:ring-2 focus:ring-blue-500" placeholder="Username" type="text"/>
              </div>

              {/* Password Input */}
              <div className="relative">
                <span className="absolute flex inset-y-0 items-center pl-4 text-gray-400">
                  <FaLock/>
                </span>
                <input className="border border-gray-300 outline-none placeholder-gray-400 pl-12 pr-8 pt-2 pb-2 rounded-xl tansition focus:ring-2 focus:ring-blue-500" placeholder="Password" type="password"/>
              </div>

                {/* Confirm Password Input */}
                <div className="relative">
                <span className="absolute flex inset-y-0 items-center pl-4 text-gray-400">
                  <FaLock/>
                </span>
                <input className="border border-gray-300 outline-none placeholder-gray-400 pl-12 pr-8 pt-2 pb-2 rounded-xl tansition focus:ring-2 focus:ring-blue-500" placeholder="Confirm Password" type="password"/>
              </div>

              {/* Login Button */}
              <motion.button className="bg-blue-500 font-medium inline-flex items-center px-6 py-2 rounded-xl text-white" whileHover={{
                scale: 1.1,
                tranition: {
                  duration: .2
                }
              }}>
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
        {/* Login Form */}
        <div className="bg-gradient-to-r from-purple-600 via-purole-500 to-blue-500 flex flex-col items-start justify-center p-4 text-white w-full h-screen rounded-tl-xl rounded-bl-xl">
        </div>
        
      </div>
    </main>
    </>
  )
}

export default register