import { FaUser, FaLock, FaUndo, FaEnvelope, FaAddressCard, FaCar } from 'react-icons/fa';
import { MdCorporateFare, MdScheduleSend, MdContactPhone, MdLocationPin  } from 'react-icons/md';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { GiMechanicGarage, GiPostStamp } from 'react-icons/gi'
const RequiredInput = (props) => {
  let { setInput } = props;
  return (
    <div className="relative m-1">
    <span className="absolute flex inset-y-0 items-center pl-2 text-gray-400">
        {props.icon === 'user' ? <FaUser/> : ''}
        {props.icon === 'pass' ? <FaLock/> : ''}
        {props.icon === 'email' ? <FaEnvelope/> : ''}
        {props.icon === 'name' ? <FaAddressCard/> : ''}
        {props.icon === 'confirm' ? <FaUndo/> : ''}
        {props.icon === 'car' ? <FaCar/> : ''}
        {props.icon === 'company' ? <MdCorporateFare/> : ''}
        {props.icon === 'number' ? <AiOutlineFieldNumber/> : ''}
        {props.icon === 'garage' ? <GiMechanicGarage/> : ''}
        {props.icon === 'contact' ? <MdContactPhone/> : ''}
        {props.icon === 'send' ? <MdScheduleSend/> : ''}
        {props.icon === 'location' ? <MdLocationPin/> : ''}
        {props.icon === 'post' ? <GiPostStamp/> : ''}
    </span>
    {
      props.update
      ?
      <input 
      className="border border-gray-300 outline-none placeholder-gray-400 pl-7 pt-2 pb-2 rounded-xl tansition focus:ring-2 focus:ring-blue-500"
      placeholder={props.placeholder}
      type={props.type}
      ref={props.ref}
      onChange={(e)=>setInput(e.target.value)}
      value={props.username}
      required
    />
      :
      (
        <input 
        className="border border-gray-300 outline-none placeholder-gray-400 pl-8 pr-8 pt-2 pb-2 rounded-xl tansition focus:ring-2 focus:ring-blue-500"
        placeholder={props.placeholder}
        type={props.type}
        ref={props.ref}
        onChange={(e)=>setInput(e.target.value)}
        value={props.username}
        required
      />
      )
    }
  </div>
  )
}

export default RequiredInput