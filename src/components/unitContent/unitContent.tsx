//React component
import { FunctionComponent } from "react";

//FramerMotion import
import { motion, AnimatePresence } from "framer-motion";

//Utils import
import { dashboardTabsVariants } from "../../utils/page-transition";

const UnitContent: FunctionComponent = () => {
  return (
    <AnimatePresence>
      <motion.div
        variants={dashboardTabsVariants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "linear" }}
        className={`dash-body p-10`}
      >
        <div className="flex flex-col gap-y-[1.5rem]">
          <span className="font-bold text-[1.5rem] ">Units</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UnitContent;
