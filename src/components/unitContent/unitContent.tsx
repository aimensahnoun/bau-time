//React component
import { FunctionComponent, useState, useEffect } from "react";

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
import { useRecoilValue , useRecoilState } from "recoil";
import { unitsState , currentTabState , previousTabState , selectedUnitState } from "../../recoil/state";

const UnitContent: FunctionComponent = () => {
  //Recoil state
  const units = useRecoilValue(unitsState);
  const [currentTab , setCurrentTab] = useRecoilState(currentTabState)
  const [_previousTab , setPreviousTab] = useRecoilState(previousTabState)
  const [_selectedUnit , setSelectedUnit] = useRecoilState(selectedUnitState)

  //Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unitsList, setUnitsList] = useState(units);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if(searchValue.length === 0) return setUnitsList(units);
    const filteredUnits = units.filter((unit) => {
      return unit.name.toLowerCase().includes(searchValue.toLowerCase()) || unit.responsible.toLowerCase().includes(searchValue.toLowerCase());
    })
    setUnitsList(filteredUnits);
  }, [units ,searchValue ]);

  return (
    <AnimatePresence exitBeforeEnter>
      <AddUnit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <motion.div
        variants={dashboardTabsVariants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "linear" }}
        className={`xl:w-[calc(100%-15rem)] 2xl:w-[calc(100%-20rem)] xl:p-10 overflow-y-scroll pb-[10rem]`}
      >
        <div className="flex flex-col gap-y-[2rem]">
          {/* Title bar */}
          <div className="flex justify-between items-center">
            <div className="flex gap-x-10 items-center">
              <span className="font-bold text-[1.5rem] ">Units</span>
              <input
                placeholder="Search for unit"
                className="w-[20rem] h-[3rem] bg-bt-dark-gray rounded-lg p-2 "
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>

            <div
              className="p-2 min-w-[5rem] h-[2.5rem] rounded-lg flex items-center cursor-pointer bg-bt-tab-bg outline-none "
              onClick={() => setIsModalOpen(true)}
            >
              <BiPlus className="text-white text-[1.1rem]" />
              <span>Add Unit</span>
            </div>
          </div>

          {/* Body */}
          <div className="">
            <div className="w-full grid grid-gap-4 gap-y-8 xl:grid-cols-5 2xl:grid-cols-10 mt-8 mb-[5rem]">
              {unitsList.map((unit) => {
                return <UnitComponent key={unit.id} unit={unit} onClick={() => {
                  setSelectedUnit(unit)
                  setPreviousTab(currentTab)
                  setCurrentTab(4)
                }} />;
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UnitContent;
