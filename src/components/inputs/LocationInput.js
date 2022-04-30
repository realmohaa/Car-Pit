import {CountryDropdown, RegionDropdown, country} from 'react-country-region-selector'
import { FcGlobe } from 'react-icons/fc'
import { FaCity } from 'react-icons/fa'
import RequiredInput from './RequiredInput'

const LocationInput = ({country, setCountry, region, setRegion}) => {
  return (
      <>
        <p className='text-gray-300 py-2 w-full'>Location Details:</p>
        <div className='flex'>
            <div className='flex-1 relative m-1'>
                <span className="absolute flex inset-y-0 items-center pl-4 text-gray-400">
                <FcGlobe/>
                </span>
            <CountryDropdown
                value={country}
                onChange={setCountry} 
                className="border w-full border-gray-300 outline-none placeholder-gray-400 pl-8 pt-2 pb-2 rounded-xl tansition focus:ring-2 focus:ring-blue-500"
            />
            </div>
            <div className='flex-1 relative m-1'>
            <span className="absolute flex inset-y-0 items-center pl-4 text-gray-400">
                <FaCity/>
                </span>
            <RegionDropdown
                className="border ml-2 w-full border-gray-300 outline-none placeholder-gray-400 pl-6 pt-2 pb-2 rounded-xl tansition focus:ring-2 focus:ring-blue-500"
                country={country}
                value={region}
                disableWhenEmpty={true}
                onChange={setRegion} />
            </div>
        </div>
      </>
  )
}

export default LocationInput