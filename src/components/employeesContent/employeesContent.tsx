//React component
import { FunctionComponent, useState } from "react";

//NextJS import
import Image from "next/image";

//FramerMotion import
import { motion, AnimatePresence } from "framer-motion";

//Icons import
import { BiPlus } from "react-icons/bi";

//Utils import
import { dashboardTabsVariants } from "../../utils/page-transition";

//Component import
import AddResponsible from "../addResponsible/addResponsible";
import EmployeeTableItem from "../employeeTableItem/employeeTableItem";

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
        {/*  Title Bar */}
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

        {/* Body */}

        <div className="flex flex-col gap-y-0 mt-[1.5rem]">
          <div
            className={`h-[12rem] bg-bt-dark-gray rounded-xl flex flex-col items-center justify-between py-3 transition-all cursor-pointer duration-300 select-none w-[11rem]
`}
          >
            {/* Unit Logo */}
            <div className="w-[3rem] h-[3rem] bg-white rounded-full  -translate-y-[1.7rem] ">
              <Image
                className="object-cover rounded-full"
                src={
                  "https://yt3.ggpht.com/ytc/AKedOLRqfxjsxWJBNtziJ5XtVDx1BwbEYwmoJZxJFr-fJQ=s900-c-k-c0x00ffffff-no-rj"
                }
                alt="unit-logo"
                width="100%"
                height="100%"
              />
            </div>
            {/* Unit name */}
            <span
              className={`font-bold transition-all unit-title duration-500   `}
            >
              International Office
            </span>
            {/* Unit actions */}
            <div className="mt-auto flex justify-between gap-x-2"></div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmployeesContent;
