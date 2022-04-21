
import { motion } from 'framer-motion';
import {FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Button = (props) => {
  return (
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
    {props.title === 'Login' ? <FaSignInAlt className="mr-2"/> : null}
    {props.title === 'Create Account' ? <FaUserPlus className="mr-2"/> : null}
     {props.title}
  </motion.button>
  )
}

export default Button