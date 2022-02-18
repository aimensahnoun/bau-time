//React imports
import { FunctionComponent } from "react";

//FramerMotion import
import { motion, AnimatePresence } from "framer-motion";

//Backdrop animation
const backdropVariants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
};

//Modal animation
const modalVariants = {
  hidden: { opacity: 0, y: "-100vh" },
  enter: { opacity: 1, y: "0", transition: { delay: 0.5 } },
};

const Modal: FunctionComponent = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="enter"
        exit="hidden"
        className="absolute inset-0 flex bg-black bg-opacity-50 z-10 justify-center items-center "
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="enter"
          exit="hidden"
          className="min-w-[30%] min-h-[50%] bg-white rounded-lg"
        ></motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
