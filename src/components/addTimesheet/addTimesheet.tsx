//React import
import { FunctionComponent, useLayoutEffect, useState } from "react";

//Component import
import Modal from "../modal/modal";

//Recoil import
import { Employee } from "../../recoil/state";

//supabase import
import supabase, { getDaysInMonth } from "../../utils/supabase";

interface AddTimesheetProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  unitId: string | null;
  filteredEmployees: Employee[];
}

const AddTimesheet: FunctionComponent<AddTimesheetProps> = ({
  isModalOpen,
  setIsModalOpen,
  unitId,
  filteredEmployees,
}) => {
  //useState
  const [maxMonth, setMaxMonth] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useLayoutEffect(() => {
    var today = new Date();
    var mm: string = (today.getMonth() + 1).toString(); //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();

    if (parseInt(mm) < 10) {
      mm = "0" + mm;
    }

    let month = yyyy + "-" + mm;
    setMaxMonth(month);
  }, []);

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      title="Add TimeSheet"
    >
      <div className="w-[25rem] ">
        <input
          type="month"
          max={maxMonth}
          onChange={(e) => {
            console.log(e.target.value);
            setSelectedMonth(e.target.value);
          }}
          className="p-2 rounded-lg bg-bt-dark-gray h-[3rem] w-[15rem]"
        />
      </div>
      <button
        onClick={async () => {
          if (selectedMonth === "") return;
          setIsSubmitting(true);
          const month = selectedMonth.split("-")[1];
          const year = selectedMonth.split("-")[0];
          const days = getDaysInMonth(parseInt(month), parseInt(year));

          const timeShetObject = {
            days: days,
          };

          filteredEmployees.forEach((employee) => {
            const hours = [];
            for (let i = 0; i < days.length; i++) {
              hours.push(0);
            }
            timeShetObject[employee.name] = hours;
          });

          const { data, error } = await supabase.from("timesheets").insert({
            month: selectedMonth,
            timesheet: timeShetObject,
            unitId: unitId,
          });

          if (error) console.log(error);
          else {
            setIsModalOpen(false);
            setSelectedMonth("");
          }
          setIsSubmitting(false);
        }}
        className="w-full h-[3rem] bg-bt-dark-gray rounded-lg mt-[2rem]"
      >
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
    </Modal>
  );
};

export default AddTimesheet;
