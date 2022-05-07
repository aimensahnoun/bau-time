//React import
import { FunctionComponent, useState } from "react";

//Component import
import CustomImage from "../customImage/customImage";
import EmployeeDetails from "../employeeDetails/employeeDetails";

//Recoil import
import { useRecoilValue, useRecoilState } from "recoil";
import { Employee, userState, selectedEmployeeState } from "../../recoil/state";

//Icons import
import { AiFillDelete } from "react-icons/ai";

//supabase import
import supabase from "../../utils/supabase";
import { toast } from "react-toastify";
interface EmployeeProps {
  employee: Employee;
}

const EmployeeItem: FunctionComponent<EmployeeProps> = ({ employee }) => {
  const user = useRecoilValue(userState);
  const [_selectedEmployee, setSelectedEmployee] = useRecoilState(
    selectedEmployeeState
  );

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => {
        setSelectedEmployee(employee);

        setIsOpen(true);
      }}
      className={`h-[12rem] bg-bt-dark-gray rounded-xl flex flex-col items-center py-3 transition-all cursor-pointer duration-300 select-none w-[11rem]
`}
    >
      <EmployeeDetails isModalOpen={isOpen} setIsModalOpen={setIsOpen} />

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

      {user?.type !== "Admin" && (
        <div
          className="mt-auto w-[1.5rem] h-[1.5rem] rounded-full flex items-center justify-center bg-[#565672]"
          onClick={async (e) => {
            e.stopPropagation();
            const confirmDelete = confirm(
              "Are you sure you want to delete this employee?"
            );
            if (!confirmDelete) return;

            const { data, error } = await supabase
              .from("workers")
              .update({ isHidden: true })
              .match({ id: employee.id });

            if (error) {
              toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            } else {
              toast.success("Assistant removed successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }
          }}
        >
          <AiFillDelete />
        </div>
      )}
    </div>
  );
};

export default EmployeeItem;
