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

//Component import
import AddUnit from "../addUnit/addUnit";
import UnitTableItem from "../unitTableItem/unitTableItem";

const UnitContent: FunctionComponent = () => {
  //Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

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

          <div className="flex flex-col gap-y-0">
            {/* Table header */}
            <div className="w-full bg-bt-tab-bg h-[2.5rem] border-b-[1px] border-bt-form-bg flex items-center px-4 mb-3">
              <span className="w-[20%] font-medium text-[1.3rem]">Unit</span>
              <span className="w-[20%] font-medium text-[1.3rem]">
                Unit Responsible
              </span>
              <span className="w-[15%] font-medium text-[1.3rem]">
                Unit Employees
              </span>
              <span className="w-[15%] font-medium text-[1.3rem]">
                Unit Timesheet
              </span>
              <span className="w-[15%] font-medium text-[1.3rem]">
                Edit Unit
              </span>
              <span className="w-[15%] font-medium text-[1.3rem]">
                Delete Unit
              </span>
            </div>

            {/* Table content */}
            <div className="flex flex-col gap-y-3 h-[70vh] overflow-y-scroll pb-4">
              <UnitTableItem
                imgUrl="https://yt3.ggpht.com/ytc/AKedOLRqfxjsxWJBNtziJ5XtVDx1BwbEYwmoJZxJFr-fJQ=s900-c-k-c0x00ffffff-no-rj"
                unitName="Intrnation Students Office"
                unitResponsible="Mehmet Yiğit Tay"
              />
            </div>
          </div>

          
        </div>


      </motion.div>
    </AnimatePresence>
  );
};

export default UnitContent;
