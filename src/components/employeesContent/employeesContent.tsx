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
          {/* Table header */}
          <div className="w-full bg-bt-tab-bg h-[2.5rem] border-b-[1px] border-bt-form-bg flex items-center px-4 mb-3">
            <span className="w-[20%] font-medium text-[1.3rem]">Employee</span>
            <span className="w-[20%] font-medium text-[1.3rem]">
              Employee Unit
            </span>
            <span className="w-[15%] font-medium text-[1.3rem]">
              Employement Type
            </span>

            <span className="w-[15%] font-medium text-[1.3rem]">Edit</span>
            <span className="w-[15%] font-medium text-[1.3rem]">Delete</span>
          </div>

          {/* Table content */}
          <div className="flex flex-col gap-y-3 h-[70vh] overflow-y-scroll pb-4">
            <EmployeeTableItem
              imgUrl="https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              employeeName="John Doe"
              employeeUnit="International Student Office"
              employmentType="Full Time"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmployeesContent;
