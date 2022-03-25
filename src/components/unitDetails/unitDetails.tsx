//React component
import { FunctionComponent, useState, useEffect, useLayoutEffect } from "react";

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
import { IoIosArrowBack } from "react-icons/io";

//Component import
import AddUnit from "../addUnit/addUnit";
import UnitComponent from "../unitComponent/unitComponent";
import EmployeesContent from "../employeesContent/employeesContent";

//Utils import
import supabase from "../../utils/supabase";

//recoil import
import { useRecoilValue, useRecoilState } from "recoil";
import {
  employeesState,
  currentTabState,
  previousTabState,
  selectedUnitState,
  Unit,
  unitsState,
  userState,
} from "../../recoil/state";
import EmployeeItem from "../employee/employee";
import TimeSheet from "../timeSheet/timeSheet";

const UnitDetails: FunctionComponent = () => {
  //Recoil state
  const employees = useRecoilValue(employeesState);
  const units = useRecoilValue(unitsState);
  const user = useRecoilValue(userState);
  const [_currentTab, setCurrentTab] = useRecoilState(currentTabState);
  const [previousTab, setPreviousTab] = useRecoilState(previousTabState);
  const [selectedUnit, setSelectedUnit] = useRecoilState(selectedUnitState);

  //Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeList, setEmplyeeList] = useState(employees);
  const [searchValue, setSearchValue] = useState("");
  const [unit, setUnit] = useState<Unit | null>(null);
  const [detailsTab, setDetailTab] = useState(0);

  useLayoutEffect(() => {
    setUnit(
      units.filter((un) => {
        return un.id === selectedUnit?.id || un?.responsibleId === user?.id;
      })[0]
    );
  }, [units]);

  // useEffect(() => {
  //   if (searchValue.length === 0) return setUnitsList(units);
  //   const filteredUnits = units.filter((unit) => {
  //     return (
  //       unit.name.toLowerCase().includes(searchValue.toLowerCase()) ||
  //       unit.responsible.toLowerCase().includes(searchValue.toLowerCase())
  //     );
  //   });
  //   setUnitsList(filteredUnits);
  // }, [units, searchValue]);

  useEffect(() => {
    if (searchValue.length === 0) return setEmplyeeList(employees);
    const filteredEmployees = employees.filter((employee) => {
      return (
        employee.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.office?.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.type.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setEmplyeeList(filteredEmployees);
  }, [employees, searchValue]);

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
        <div className="flex flex-col gap-y-[2rem]">
          {/* Title bar */}
          <div className="flex justify-between items-center">
            <div className="flex gap-x-10 items-center">
              {user?.type === "Admin" && (
                <IoIosArrowBack
                  className="text-[1.5rem] -mr-8 cursor-pointer"
                  onClick={() => {
                    setSelectedUnit(null);
                    setCurrentTab(previousTab);
                    setPreviousTab(0);
                  }}
                />
              )}
              <span className="font-bold text-[1.5rem] ">{unit?.name}</span>
            </div>

            {user?.type == "Responsible" && (
              <div
                className="p-2 min-w-[5rem] h-[2.5rem] rounded-lg flex items-center cursor-pointer bg-bt-tab-bg outline-none "
                onClick={() => setIsModalOpen(true)}
              >
                <BiPlus className="text-white text-[1.1rem]" />
                <span>
                  {detailsTab === 2 ? "Create TimeSheet" : "Add Assistant"}
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-x-4 justify-start w-full -mt-[1rem] items-center ">
            <span
              onClick={() => setDetailTab(0)}
              className={`font-medium  cursor-pointer transition-all duration-300 opacity-50 ${
                detailsTab === 0 ? "text-[1.2rem] opacity-100" : ""
              }  `}
            >
              Unit Schedule
            </span>
            <span
              onClick={() => setDetailTab(1)}
              className={`font-medium  cursor-pointer transition-all duration-300 opacity-50 ${
                detailsTab === 1 ? "text-[1.2rem] opacity-100" : ""
              }  `}
            >
              Unit Employees
            </span>
            <span
              onClick={() => setDetailTab(2)}
              className={`font-medium  cursor-pointer transition-all duration-300 opacity-50 ${
                detailsTab === 2 ? "text-[1.2rem] opacity-100" : ""
              }  `}
            >
              Unit Timesheet
            </span>
          </div>

          {/* Body */}
          <div className="h-full">
            {detailsTab === 0 ? (
              <iframe
                id="iframepdf"
                className="w-full h-[70vh]"
                src="https://bafybeiawdqnvo3rq6pm37ups2ar474us3knboycfw2svdqrcaqwdso22mm.ipfs.dweb.link/BAU%20ISO%20Schedule%20-%20Sheet%20%281%29.pdf"
              ></iframe>
            ) : detailsTab === 1 ? (
              <div className="flex flex-col gap-y-2 -mt-4">
                <input
                  placeholder="Search for employee"
                  className="w-[20rem] h-[3rem] bg-bt-dark-gray rounded-lg p-2 outline-none"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <div className="w-full grid grid-gap-3 2xl:grid-cols-10 mt-6">
                  {employeeList.map((employee) => {
                    return (
                      <EmployeeItem key={employee.id} employee={employee} />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="w-full">
                <TimeSheet />
                <TimeSheet />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UnitDetails;
