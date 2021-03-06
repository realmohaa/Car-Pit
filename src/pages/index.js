import { FaUserPlus, FaUndo } from 'react-icons/fa';
import { RiLoginBoxLine } from 'react-icons/ri';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AuthCanvas from '../components/AuthCanvas';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';
import { handleSubmit } from '../helpers/login_helper';
import Input from '../components/inputs/RequiredInput';
import { LoadingButton } from '@mui/lab'; 

const Login = () => {
  const router = useRouter();
  const userRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const credentials = {username,password}

  const [loading, setLoading] = useState(false);

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
            <form onSubmit={(e) => {handleSubmit(e, credentials, setLoading, (res) => {
                  console.log(res)
                  if(res.status === 200) {
                    if(res.data.session.accountType === 'user') {
                      router.push("/dashboard")
                    } else if(res.data.session.accountType === 'garage') {
                      router.push("/garage")
                    }
                  }
                })}} className="flex flex-col items-center space-y-2">
              {/* Username Input */}
              <Input icon="user" placeholder="Username" type="text" ref={userRef} username={username} setInput={setUsername}/>
              {/* Password Input */}
              <Input icon="pass" placeholder="Password" type="password" password={password} setInput={setPassword}/>
              {/* Login Button */}
              <LoadingButton
                type='submit'
                endIcon={<RiLoginBoxLine />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                disabled={!username || !password}
                className='rounded-xl px-6 py-2 hover:scale-110 bg-blue-500 hover:bg-blue-600 transition-all duration-200'
              >
                Login
              </LoadingButton>
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