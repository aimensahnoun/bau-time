//React component
import { FunctionComponent } from "react";

//FramerMotion import
import { motion, AnimatePresence } from "framer-motion";

//Utils import
import { dashboardTabsVariants } from "../../utils/page-transition";

//Icons import
import { BiPlus } from "react-icons/bi";

//Component import
import Modal from "../modal/modal";

const UnitContent: FunctionComponent = () => {
  return (
    <AnimatePresence exitBeforeEnter>
        <Modal />
      <motion.div
        variants={dashboardTabsVariants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "linear" }}
        className={`dash-body p-10`}
      >
        <div className="flex flex-col gap-y-[1.5rem]">
          <div className="flex justify-between items-center">
            <span className="font-bold text-[1.5rem] ">Units</span>
            <div className="p-2 min-w-[5rem] h-[2.5rem] rounded-lg flex items-center cursor-pointer bg-bt-tab-bg ">
              <BiPlus className="text-white text-[1.1rem]" />
              <span>Add Unit</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UnitContent;
