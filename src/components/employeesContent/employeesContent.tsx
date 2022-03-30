//React component
import { FunctionComponent, useState } from "react";

//NextJS import
import Image from "next/image";

//React import
import { useLayoutEffect, useEffect } from "react";

//FramerMotion import
import { motion, AnimatePresence } from "framer-motion";

//Icons import
import { BiPlus } from "react-icons/bi";

//Utils import
import { dashboardTabsVariants } from "../../utils/page-transition";

//Component import
import AddResponsible from "../addResponsible/addResponsible";
import EmployeeItem from "../employee/employee";

//Recoil import
import { useRecoilState, useRecoilValue } from "recoil";
import { employeesState, userState } from "../../recoil/state";

//supabase import
import supabase from "../../utils/supabase";

const EmployeesContent: FunctionComponent = () => {
  //Recoil State
  const [employees, setEmployees] = useRecoilState(employeesState);
  const user = useRecoilValue(userState);

  //UseState
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [employessList, setEmployessList] = useState(employees);

  useLayoutEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("workers").select();
      if (error) return;
      if (!data) return;
      setEmployees(data);
    })();
  }, []);

  useEffect(() => {
    if (searchValue.length === 0)
      return setEmployessList(
        employees.filter((employee) => {
          return employee.id !== user?.id;
        })
      );
    const filteredEmployees = employees.filter((employee) => {
      return (
        employee.id !== user?.id &&
        (employee.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          employee.office?.toLowerCase().includes(searchValue.toLowerCase()) ||
          employee.type.toLowerCase().includes(searchValue.toLowerCase()))
      );
    });
    setEmployessList(filteredEmployees);
  }, [employees, searchValue]);

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
        className={`xl:w-[calc(100%-15rem)] 2xl:w-[calc(100%-20rem)] xl:p-10 overflow-y-scroll pb-[10rem]`}
      >
        {/*  Title Bar */}
        <div className="flex  flex-col gap-y-[2rem]">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-10 items-center">
              <span className="font-bold text-[1.5rem] ">Employees</span>
              <input
                placeholder="Search for employee"
                className="w-[20rem] h-[3rem] bg-bt-dark-gray rounded-lg p-2 outline-none"
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
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

        <div className="w-full grid grid-gap-4 gap-y-8 xl:grid-cols-5 2xl:grid-cols-10 mt-8 mb-[5rem]">
          {employessList.map((employee) => {
            return <EmployeeItem key={employee.id} employee={employee} />;
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmployeesContent;
