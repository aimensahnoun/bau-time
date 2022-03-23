//React component
import { FunctionComponent, useState, useEffect , useLayoutEffect } from "react";

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

//recoil import
import { useRecoilValue , useRecoilState} from "recoil";
import { unitsState , currentTabState , previousTabState , selectedUnitState , Unit} from "../../recoil/state";

const UnitDetails: FunctionComponent = () => {
  //Recoil state
  const units = useRecoilValue(unitsState);
  const [_currentTab , setCurrentTab] = useRecoilState(currentTabState)
  const [previousTab , setPreviousTab] = useRecoilState(previousTabState)
  const [selectedUnit , setSelectedUnit] = useRecoilState(selectedUnitState)

  //Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unitsList, setUnitsList] = useState(units);
  const [searchValue, setSearchValue] = useState("");
  const [unit , setUnit] = useState<Unit | null>(null);

  useLayoutEffect(() => {
    setUnit(units.filter((un) => {
      return un.id === selectedUnit?.id;
    })[0])
  } , [units])


  useEffect(() => {
    if (searchValue.length === 0) return setUnitsList(units);
    const filteredUnits = units.filter((unit) => {
      return (
        unit.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        unit.responsible.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setUnitsList(filteredUnits);
  }, [units, searchValue]);

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
              <IoIosArrowBack className="text-[1.5rem] -mr-8 cursor-pointer" onClick={() => {
                setSelectedUnit(null);
                setCurrentTab(previousTab);
                setPreviousTab(0);
              }} />
              <span className="font-bold text-[1.5rem] ">{unit?.name}</span>
              <input
                placeholder="Search for unit"
                className="w-[20rem] h-[3rem] bg-bt-dark-gray rounded-lg p-2 outline-none"
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
            <div className="grid gap-x-3 gap-y-6 grid-cols-4 2xl:grid-cols-10">
              {unitsList.map((unit) => {
                return (
                  <UnitComponent key={unit.id} unit={unit} onClick={() => {}} />
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UnitDetails;
