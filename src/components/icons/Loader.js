import { motion, AnimatePresence } from "framer-motion";

const loader = {
    visible: {  opacity: 1 },
    hidden: { opacity: 0 }
}

const Loader = () => {
  return (
      <AnimatePresence exitBeforeEnter>
        <motion.div 
            className="lds-ellipsis"
            variants={loader}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </motion.div>
      </AnimatePresence>
  )
}

export default Loader