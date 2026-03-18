import { useAppStore } from "./store/appStore"
import LockScreen from "./pages/LockScreen"
import Welcome from "./pages/Welcome"
import Mystery from "./pages/Mystery"
import MessageBoard from "./pages/MessageBoard"
import Question from "./pages/Question"
import Celebration from "./pages/Celebration"

import { AnimatePresence, motion } from "framer-motion"

function App() {

  const page = useAppStore((state) => state.page)

  const renderPage = () => {
    if (page === 0) return <LockScreen />
    if (page === 1) return <Welcome />
    if (page === 2) return <Mystery />
    if (page === 3) return <MessageBoard/>
    if (page === 4) return <Question/>
    if (page === 5) return <Celebration/>
    return null
  }

  return (
    <div className="w-screen h-screen overflow-hidden">   {/* 👈 ADD THIS */}

      <AnimatePresence mode="wait">

        <motion.div
          key={page}

          className="w-full h-full overflow-hidden"   

          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}

          transition={{ duration: 0.8 }}
        >

          {renderPage()}

        </motion.div>

      </AnimatePresence>

    </div>
  )
}

export default App