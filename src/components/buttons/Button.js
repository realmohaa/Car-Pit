
import { motion } from 'framer-motion';
import {
  FaSignInAlt,
  FaUserPlus,
  FaPlus,
  FaRegTrashAlt,
  FaInfoCircle,
  FaHistory,
  FaCommentAlt,
  FaCalendarAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import { BsCalendar2X } from 'react-icons/bs'
import { MdScheduleSend, MdOutlinePublishedWithChanges, MdCancel } from 'react-icons/md'
import { GoVerified } from 'react-icons/go'
import styled from "styled-components";

const Button = (props) => {
  const CustomButton = styled(motion.button)`
   background-color: ${props.color ? props.color : "rgb(59, 130, 246)"};
   color: ${props.textColor ? props.textColor : "#FFF"};
  `
  return (
    <CustomButton
    className="font-medium inline-flex items-center px-6 py-2 rounded-xl text-white"
    whileHover={{
      scale: 1.1,
      tranition: {
          duration: .2
      }
    }}
    whileFocus={{
      scale: 0.95,
      backgroundColor: 'transparent',
      color: 'lightgray',
      border: '3px solid lightgray'
    }}
    >
    {props.title}
    {props.title === 'Login' ? <FaSignInAlt className="ml-2 "/> : null}
    {props.title === 'Create Account' ? <FaUserPlus className="ml-2"/> : null}
    {props.title === 'Add Vehicle' ? <FaPlus className="ml-2"/> : null}
    {props.title === 'Delete Vehicle' ? <FaRegTrashAlt className="ml-2"/> : null}
    {props.title === 'Vehicle Details' ? <FaInfoCircle className="ml-2"/> : null}
    {props.title === 'Vehicle History' ? <FaHistory className="ml-2"/> : null}
    {props.title === 'Message' ? <FaCommentAlt className="ml-2"/> : null}
    {props.title === 'Schedule Appointment' ? <FaCalendarAlt className="ml-2"/> : null}
    {props.title === 'Send Application' ? <MdScheduleSend className="ml-2"/> : ''}
    {props.title === 'Update' ? <MdOutlinePublishedWithChanges className="ml-2"/> : ''}
    {props.title === 'Verify' ? <GoVerified className="ml-2"/> : ''}
    {props.title === 'Logout' ? <FaSignOutAlt className="ml-2"/> : ''}
    {props.title === 'Submit Appointment' ? <MdScheduleSend className="ml-2"/> : ''}
    {props.title === 'Cancel' ? <MdCancel className="ml-2 opacity-70"/> : ''}
    {props.title === 'Reschedule' ? <BsCalendar2X className="ml-2 opacity-70"/> : ''}
  </CustomButton>
  )
}

export default Button