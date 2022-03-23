//React import
import { FunctionComponent } from "react";

//Component import
import CustomImage from "../customImage/customImage";

//Recoil import
import {Employee} from "../../recoil/state"

interface EmployeeProps  {
    employee: Employee
}

const EmployeeItem: FunctionComponent<EmployeeProps> = ({employee}) => {
  return (
    <div
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
};

export default EmployeeItem;
