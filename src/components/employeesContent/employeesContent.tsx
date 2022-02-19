//React component
import { FunctionComponent, useState } from "react";

//FramerMotion import
import { motion, AnimatePresence } from "framer-motion";

//Icons import
import { BiPlus } from "react-icons/bi";

//Utils import
import { dashboardTabsVariants } from "../../utils/page-transition";

//Component import
import AddResponsible from "../addResponsible/addResponsible";

const EmployeesContent: FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AnimatePresence exitBeforeEnter>
      <AddResponsible
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></AddResponsible>
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
            <span className="font-bold text-[1.5rem] ">Employees</span>
            <div
              className="p-2 min-w-[5rem] h-[2.5rem] rounded-lg flex items-center cursor-pointer bg-bt-tab-bg "
              onClick={() => setIsModalOpen(true)}
            >
              <BiPlus className="text-white text-[1.1rem]" />
              <span>Add Employees</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmployeesContent;
