import { FaUser, FaLock, FaSignInAlt, FaUserPlus, FaUndo, FaEnvelope, FaAddressCard } from 'react-icons/fa';
const RequiredInput = (props) => {
    var { setInput } = props;
  return (
    <div className="relative m-1">
    <span className="absolute flex inset-y-0 items-center pl-4 text-gray-400">
        {props.icon === 'user' ? <FaUser/> : ''}
        {props.icon === 'pass' ? <FaLock/> : ''}
        {props.icon === 'email' ? <FaEnvelope/> : ''}
        {props.icon === 'name' ? <FaAddressCard/> : ''}
        {props.icon === 'confirm' ? <FaUndo/> : ''}
    </span>
    <input 
      className="border border-gray-300 outline-none placeholder-gray-400 pl-10 pr-8 pt-2 pb-2 rounded-xl tansition focus:ring-2 focus:ring-blue-500"
      placeholder={props.placeholder}
      type={props.type}
      ref={props.ref}
      onChange={(e)=>setInput(e.target.value)}
      value={props.username}
      required
    />
  </div>
  )
}

export default RequiredInput