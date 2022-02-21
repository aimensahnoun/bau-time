//React import
import { FunctionComponent } from "react";

//NextJS import
import Image from "next/image";

interface UnitTableItemProps {
  imgUrl: string;
  unitName: string;
  unitResponsible: string;
}

const UnitTableItem: FunctionComponent<UnitTableItemProps> = ({imgUrl, unitName , unitResponsible}) => {
  return (
    <div className="w-full  h-[2.5rem] border-b-[1px] border-bt-tab-bg flex items-center px-4 pb-6 pt-5 hover:bg-bt-tab-bg/30">
      <div className="w-[20%] font-medium text-[1.3rem] flex items-center gap-x-2 cursor-pointer">
        <div className=" flex items-center w-[2.5rem] h-[2.5rem] rounded-full bg-bt-tab-bg">
          <Image
            src={imgUrl}
            width="100%"
            height="100%"
            alt="unit logo"
            className="rounded-full object-cover"
          />
        </div>
        <span className="overflow-hidden whitespace-nowrap text-ellipsis">
          {unitName}
        </span>
      </div>
      <span className="w-[20%] font-medium text-[1.3rem] overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer select-none">
        {unitResponsible}
      </span>
      <div className="w-[15%] font-medium text-[1.3rem] ">
        <div className="w-fit h-[2rem] rounded-lg bg-bt-tab-bg  flex justify-center items-center cursor-pointer select-none px-4">
          <span className="text-white">See Employees</span>
        </div>
      </div>
      <div className="w-[15%] font-medium text-[1.3rem]">
        <div className="w-fit h-[2rem] rounded-lg bg-bt-tab-bg  flex justify-center items-center cursor-pointer select-none px-4">
          <span className="text-white">See Timesheet</span>
        </div>
      </div>
      <div className="w-[15%] font-medium text-[1.3rem]">
        <div className="w-[5rem] h-[2rem] rounded-lg bg-bt-tab-bg  flex justify-center items-center cursor-pointer select-none">
          <span className="text-white">Edit</span>
        </div>
      </div>
      <div className="w-[15%] font-medium text-[1.3rem]">
        <div className="w-[5rem] h-[2rem] rounded-lg bg-[#482F38] border-[#DC3545] border-[1px] flex justify-center items-center cursor-pointer select-none">
          <span className="text-[#DC3545]">Delete</span>
        </div>
      </div>
    </div>
  );
};

export default UnitTableItem;
