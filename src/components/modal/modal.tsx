//React imports
import { FunctionComponent } from "react";

//FramerMotion import
import { motion, AnimatePresence } from "framer-motion";

//import Icons
import { MdClose } from "react-icons/md";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
}

const Modal: FunctionComponent<ModalProps> = ({
  isOpen,
  setIsOpen,
  title,
  children,
}) => {
  //Backdrop animation
  const backdropVariants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
  };

  //Modal animation
  const modalVariants = {
    hidden: { opacity: 0, y: "-50px" },
    enter: { opacity: 1, y: "0", transition: { delay: 0.3 } },
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen ? (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="enter"
          exit="hidden"
          className="absolute inset-0 flex bg-black bg-opacity-30 z-10 justify-center items-center "
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="enter"
            exit="hidden"
            className={`w-fit xl:h-[60%] h-[50%] max-h-fit bg-bt-accent-bg rounded-lg p-6 overflow-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full items-center justify-between mb-[1rem] ">
              <span className="font-bold  text-[1.5rem]">{title}</span>
              <div
                className="bg-bt-tab-bg w-[2rem] h-[2rem] rounded-full flex justify-center items-center cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <MdClose className="text-white text-[1.3rem]" />
              </div>
            </div>
            {/* Content goes here */}
            <div className=" h-[*] max-h-fit flex flex-col">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;
