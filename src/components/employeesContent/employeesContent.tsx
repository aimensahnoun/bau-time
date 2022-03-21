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

//Recoil import
import { useRecoilState } from "recoil";
import { employeesState } from "../../recoil/state";

//supabase import
import supabase from "../../utils/supabase";
import CustomImage from "../customImage/customImage";

const EmployeesContent: FunctionComponent = () => {
  //Recoil State
  const [employees, setEmployees] = useRecoilState(employeesState);
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
    if (searchValue.length === 0) return setEmployessList(employees);
    const filteredEmployees = employees.filter((employee) => {
      return (
        employee.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.office?.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.type.toLowerCase().includes(searchValue.toLowerCase())
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
        className={`dash-body p-10`}
      >
        {/*  Title Bar */}
        <div className="flex  flex-col gap-y-[2rem]">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-10 items-center">
              <span className="font-bold text-[1.5rem] ">Employees</span>
              <input
                placeholder="Search for employee"
                className="w-[20rem] h-[3rem] bg-bt-dark-gray rounded-lg p-2"
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

        <div className="w-full grid grid-gap-3 2xl:grid-cols-10 mt-6">
          {employessList.map((employee) => {
            return (
              <div
                key={employee.id}
                className={`h-[12rem] bg-bt-dark-gray rounded-xl flex flex-col items-center py-3 transition-all cursor-pointer duration-300 select-none w-[11rem]
`}
              >
                {/* Employee image */}
                <div className="w-[3rem] h-[3rem] bg-white rounded-full  -translate-y-[1.7rem] ">
                  <CustomImage
                    src={employee.imgUrl}
                    alt="employee image"
                    height="100%"
                    layout="fill"
                    width="100%"
                    className="rounded-full"
                  />
                </div>
                {/* employee name */}
                <span
                  className={`font-bold transition-all unit-title duration-500  text-ellipsis whitespace-nowrap overflow-hiddens`}
                >
                  {employee.name}
                </span>

                <span
                  className={`font-medium text-[.8rem] transition-all unit-title duration-500  text-ellipsis whitespace-nowrap overflow-hiddens`}
                >
                  {employee.type}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmployeesContent;
