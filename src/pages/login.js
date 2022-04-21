import { FaUserPlus, FaUndo } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AuthCanvas from '../components/AuthCanvas';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { handleSubmit } from '../helpers/login_helper';
import Input from '../components/inputs/RequiredInput';
import Button from '../components/buttons/Button';

toast.configure()
const Login = () => {
  const router = useRouter();
  const userRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const credentials = {username,password}

  useEffect(() => {
      // userRef.current.focus();
  },[]);

  useEffect(() => {
  },[username, password]);

  return (
    <>
    {/* Main Container */}
    <main className="block items-center justify-center md:flex w-full">
      {/* Login Card */}
      <div className="flex flex-col justify-evenly max-w-screen overflow-hidden shadow-lg text-white w-full md:flex-row">
        <div className="flex flex-col text-center items-center justify-center p-12 md:6 text-black w-full md:w-1/2 divide-y">
          <div className="w-full mb-2">
            {/* Welcoming Div */}
            <div className=" pb-4">
              <h1 className="font-medium text-blue-500 text-2xl">Welcome Back</h1>
              <p className="text-gray-400 text-md">Login to your account</p>
            </div>
            {/* Login Form */}
            <form onSubmit={(e) => {handleSubmit(e, credentials, (res) => {
              if(res.status === 200) {
                router.push("/dashboard")
              }
            })}} className="flex flex-col items-center space-y-2">
              {/* Username Input */}
              <Input icon="user" placeholder="Username" type="text" ref={userRef} username={username} setInput={setUsername}/>
              {/* Password Input */}
              <Input icon="pass" placeholder="Password" type="password" password={password} setInput={setPassword}/>
              {/* Login Button */}
              <Button title="Login"/>
            </form>
          </div>

          <div className="lg:w-1/2 w-full mt-2">
            <div className='text-gray-400 text-md m-2 flex flex-col'>
              <motion.div className="mt-2 flex flex-row justify-center items-center" whileHover={{
                scale: 1.1,
                tranition: {
                  duration: .2
                }}}>
              <FaUndo className="mr-2"/>
                <Link href="/">Forget password?</Link>
              </motion.div>
              <motion.div className="flex flex-row justify-center items-center" whileHover={{
                scale: 1.1,
                tranition: {
                  duration: .2
                }}}>
              <FaUserPlus className="mr-2"/>
                <Link href="/register">Sign up</Link>
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

export default Login