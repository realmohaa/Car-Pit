import { FaImage } from 'react-icons/fa';
import { motion } from 'framer-motion';
const ProfileImgUpload = (props) => {
    const { setFile } = props
  return (
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
                    <input 
                        type="file"
                        className="h-full w-full opacity-0"
                        name={props.name} 
                        accept="image/png"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setFile(file)
                        }}
                    />
                    </motion.div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileImgUpload