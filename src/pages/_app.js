import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence>
      <motion.div key={router.route} initial="pageInitial" animate="pageAnimate" exit="pageExit" variants={{
        pageInitial: {
          opacity: 0
        }, 
        pageAnimate: {
          opacity: 1
        },
        pageExit: {
          backgroundColor: "white",
          opacity: 0
        }
      }}>
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  )
}

export default MyApp
