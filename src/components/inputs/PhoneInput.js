import PhoneInputWithCountrySelect from 'react-phone-number-input';

const PhoneInput = (props) => {
  const { setValue, placeholder, value } = props ;
  return (
    <PhoneInputWithCountrySelect 
    className="border border-gray-300 outline-none placeholder-gray-400 pl-4 pr-2 pt-2 pb-2 rounded-xl tansition focus:ring-2 focus:ring-blue-500"
    placeholder={placeholder}
    value={value}
    onChange={setValue}/>
  )
}

export default PhoneInput