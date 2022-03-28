//React import
import { FunctionComponent } from "react";

//NextJS import
import Image from "next/image";

//Icon import
import { AiOutlineHourglass } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";

//recoil import
import { useRecoilState } from "recoil";
import { Unit, unitDetailsTab } from "../../recoil/state";
import CustomImage from "../customImage/customImage";

interface UnitComponentProps {
  unit: Unit;
  onClick: () => void;
}

const UnitComponent: FunctionComponent<UnitComponentProps> = ({
  unit,
  onClick,
}) => {
  //Recoil State
  const [_unitDetailsCurrentTab, setUnitDetailsCurrentTab] =
    useRecoilState(unitDetailsTab);

  return (
    <div
      onClick={onClick}
      className={`h-[12rem] bg-bt-dark-gray rounded-xl flex flex-col items-center justify-between py-3 transition-all cursor-pointer duration-300 select-none w-[11rem]
`}
    >
      {/* Unit Logo */}
      <div className="w-[3rem] h-[3rem] bg-white rounded-full  -translate-y-[1.7rem] ">
        <CustomImage
          className="object-cover rounded-full"
          src={unit.imgUrl}
          alt="unit-logo"
          width="100%"
          height="100%"
          layout="fill"
        />
      </div>
      {/* Unit name */}
      <span className={`font-bold transition-all unit-title duration-500   `}>
        {unit.name}
      </span>
      {/* Responsible name */}
      <span
        className={` text-[.8rem] transition-all unit-title duration-500   `}
      >
        {unit.responsible}
      </span>
      {/* Unit actions */}
      <div className="mt-auto flex justify-between gap-x-2">
        <div
          className="w-[1.7rem] h-[1.7rem] bg-[#565672] rounded-full flex items-center justify-center"
          onClick={(e) => {
            //Prevent parents onClick event
            e.stopPropagation();
            setUnitDetailsCurrentTab(1);
            onClick();
          }}
        >
          <FiUsers />
        </div>
        <div
          className={`w-[1.7rem] h-[1.7rem] bg-[#565672] rounded-full flex items-center justify-center transition-all duration-300 `}
          onClick={(e) => {
            //Prevent parents onClick event
            e.stopPropagation();
            setUnitDetailsCurrentTab(2);
            onClick();
          }}
        >
          <AiOutlineHourglass />
        </div>
      </div>
    </div>
  );
};

export default UnitComponent;
