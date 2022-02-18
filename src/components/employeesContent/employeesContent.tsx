//React component
import { FunctionComponent } from "react";

//FramerMotion import
import { motion, AnimatePresence } from "framer-motion";

//Component import
import Unit from "../unit/unit";

//Utils import
import { dashboardTabsVariants } from "../../utils/page-transition";

const EmployeesContent: FunctionComponent = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        variants={dashboardTabsVariants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "linear" }}
        className={`dash-body p-10`}
      >
        <div className="flex flex-col gap-y-[1.5rem]">
          <span className="font-bold text-[1.5rem] ">Employees</span>
          <div className="flex min-w-[17rem] overflow-x-scroll items-center scroll h-[20rem] gap-x-3 no-scrollbar"></div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmployeesContent;
