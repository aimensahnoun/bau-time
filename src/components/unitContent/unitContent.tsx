//React component
import { FunctionComponent, useState } from "react";

//NextJS import
import Image from "next/image";

//FramerMotion import
import { motion, AnimatePresence } from "framer-motion";

//Utils import
import { dashboardTabsVariants } from "../../utils/page-transition";

//Icons import
import { BiPlus } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { AiOutlineHourglass } from "react-icons/ai";

//Component import
import AddUnit from "../addUnit/addUnit";
import UnitComponent from "../unitComponent/unitComponent";

//recoil import
import { useRecoilValue } from "recoil";
import { unitsState } from "../../recoil/state";

const UnitContent: FunctionComponent = () => {
  //Recoil state
  const units = useRecoilValue(unitsState);

  //Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(units);

  return (
    <AnimatePresence exitBeforeEnter>
      <AddUnit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <motion.div
        variants={dashboardTabsVariants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "linear" }}
        className={`dash-body p-10`}
      >
        <div className="flex flex-col gap-y-[1.5rem]">
          {/* Title bar */}
          <div className="flex justify-between items-center">
            <span className="font-bold text-[1.5rem] ">Units</span>
            <div
              className="p-2 min-w-[5rem] h-[2.5rem] rounded-lg flex items-center cursor-pointer bg-bt-tab-bg "
              onClick={() => setIsModalOpen(true)}
            >
              <BiPlus className="text-white text-[1.1rem]" />
              <span>Add Unit</span>
            </div>
          </div>

          {/* Body */}
          <div className="">
            <div className="grid gap-x-3 gap-y-6 grid-cols-4 2xl:grid-cols-10">
              {units.map((unit) => {
                return <UnitComponent key={unit.id} unit={unit}  />;
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UnitContent;
