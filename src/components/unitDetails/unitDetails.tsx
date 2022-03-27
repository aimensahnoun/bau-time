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
import { IoIosArrowBack } from "react-icons/io";

//Component import
import AddUnit from "../addUnit/addUnit";
import EmployeeItem from "../employee/employee";
import TimeSheet from "../timeSheet/timeSheet";
import ScheduleComponent from "../scheduleComponent/scheduleComponent";
import AddSchedule from "../addScheduleModal/addScheduleModal";
import AddAssitant from "../addAssitant/addAssitant";
import AddTimesheet from "../addTimesheet/addTimesheet";

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
  timesheetsState,
} from "../../recoil/state";

const UnitDetails: FunctionComponent = () => {
  //Recoil state
  const employees = useRecoilValue(employeesState);
  const units = useRecoilValue(unitsState);
  const user = useRecoilValue(userState);
  const timesheets = useRecoilValue(timesheetsState);
  const [_currentTab, setCurrentTab] = useRecoilState(currentTabState);
  const [previousTab, setPreviousTab] = useRecoilState(previousTabState);
  const [selectedUnit, setSelectedUnit] = useRecoilState(selectedUnitState);

  //Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeList, setEmplyeeList] = useState(
    employees.filter(
      (employee) =>
        (employee.office === unit?.name || employee.office === unit?.id) &&
        employee.type === "Assistant"
    )
  );
  const [searchValue, setSearchValue] = useState("");
  const [unit, setUnit] = useState<Unit | null>(null);
  const [detailsTab, setDetailTab] = useState(0);
  const [unitTimesheets, setUnitTimesheets] = useState([]);

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
    if (searchValue.length === 0)
      return setEmplyeeList(
        employees.filter(
          (employee) =>
            (employee.office === unit?.name || employee.office === unit?.id) &&
            employee.type === "Assistant"
        )
      );
    const filteredEmployees = employees.filter((employee) => {
      return (
        (employee.office === unit?.name || employee.office === unit?.id) &&
        employee.type === "Assistant" &&
        employee.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setEmplyeeList(filteredEmployees);
  }, [employees, searchValue, unit]);

  useEffect(() => {
    setUnitTimesheets(
      timesheets.filter((timesheet) => timesheet.unitId === unit?.id)
    );
  }, [timesheets, employees, unit]);

  return (
    <AnimatePresence exitBeforeEnter>
      <AddSchedule
        isModalOpen={isModalOpen && detailsTab === 0}
        setIsModalOpen={setIsModalOpen}
        unitId={unit?.id}
      />
      <AddAssitant
        isModalOpen={isModalOpen && detailsTab === 1}
        setIsModalOpen={setIsModalOpen}
        unitId={unit?.id}
      />

      <AddTimesheet
        isModalOpen={isModalOpen && detailsTab === 2}
        setIsModalOpen={setIsModalOpen}
        unitId={unit?.id}
        filteredEmployees={employeeList}
      />

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
                  {detailsTab === 0
                    ? "Add Schedule"
                    : detailsTab === 2
                    ? "Create TimeSheet"
                    : "Add Assistant"}
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
              <ScheduleComponent schedule={unit?.schedule} />
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
              <div className="w-full flex flex-col gap-y-2">
                {unitTimesheets
                  .sort((a, b) => new Date(b.month) - new Date(a.month))
                  .map((timesheet) => {
                    return (
                      <TimeSheet
                        key={timesheet.id}
                        timesheet={timesheet}
                        unitName={unit?.name}
                      />
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UnitDetails;
