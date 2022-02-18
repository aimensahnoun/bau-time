//React import
import { FunctionComponent, useState } from "react";

//NextJS import
import Image from "next/image";

//Icon import
import { AiOutlineHourglass } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";


interface UnitProps {
    title: string;
    imgUrl : string;
}

const Unit: FunctionComponent<UnitProps> = ({title , imgUrl}) => {
  //Checking if unit is open
  const [unitOpen, setUnitOpen] = useState(false);

  return (
    <div
      onClick={(e) => {
        setUnitOpen(!unitOpen);
      }}
      className={`h-[15rem] bg-bt-dark-gray rounded-xl flex flex-col items-center justify-between py-3 transition-all cursor-pointer duration-300 select-none  ${
        unitOpen ? "w-[11rem]" : "w-[5rem]"
      }`}
    >
      {/* Unit Logo */}
      <div className="w-[3rem] h-[3rem] bg-white rounded-full  -translate-y-[1.7rem] ">
        <Image
          className="object-cover rounded-full"
          src={imgUrl}
          alt="unit-logo"
          width="100%"
          height="100%"
        />
      </div>
      {/* Unit name */}
      <span
        className={`font-bold transition-all unit-title duration-500  ${
          unitOpen ? "rotate-[0deg]" : "rotate-[90deg]"
        } `}
      >
        {title}
      </span>
      {/* Unit actions */}
      <div className="mt-auto flex justify-between gap-x-2">
        <div
          className="w-[1.7rem] h-[1.7rem] bg-[#565672] rounded-full flex items-center justify-center"
          onClick={(e) => {
            //Prevent parents onClick event
            e.stopPropagation();
          }}
        >
          <FiUsers />
        </div>
        <div
          className={`w-[1.7rem] h-[1.7rem] bg-[#565672] rounded-full flex items-center justify-center transition-all duration-300 ${
            unitOpen ? "block" : "hidden"
          } `}
          onClick={(e) => {
            //Prevent parents onClick event
            e.stopPropagation();
          }}
        >
          <AiOutlineHourglass />
        </div>
      </div>
    </div>
  );
};

export default Unit;
