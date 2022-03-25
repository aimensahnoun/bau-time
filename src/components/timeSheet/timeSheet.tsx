//React import
import { FunctionComponent, useState, useEffect, useLayoutEffect } from "react";

//Icon import
import { AiOutlineDown } from "react-icons/ai";

//Utils import
import { timeSheetAnimation } from "../../utils/page-transition";
//FramerMotion import
import { motion, AnimatePresence } from "framer-motion";

const TimeSheet: FunctionComponent = () => {
  //Use State
  const [isOpen, setIsOpen] = useState(false);
  const [workDays, setWorkDays] = useState<number[]>([]);

  useLayoutEffect(() => {
    setWorkDays(getDaysInMonth(3, 2022));
  }, []);

  function getDaysInMonth(month: number, year: number): number[] {
    month--; // lets fix the month once, here and be done with it
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      // Exclude weekends
      var tmpDate = new Date(date);
      var weekDay = tmpDate.getDay(); // week day
      var day = tmpDate.getDate(); // day

      if (weekDay % 6) {
        // exclude 0=Sunday and 6=Saturday
        days.push(day);
      }

      date.setDate(date.getDate() + 1);
    }

    return days;
  }

  return (
    <div className="w-full select-none">
      <div
        className="flex items-center justify-between p-2 hover:bg-bt-dark-gray rounded-lg cursor-pointer mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[1.5rem] font-medium">March, 2022</span>
        <AiOutlineDown
          className={`text-[1.5rem] transition-all duration-300 rotate-0 ${
            isOpen && "-rotate-180"
          }`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={timeSheetAnimation}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{ type: "linear" }}
          >
            <table className="table-auto">
              <thead>
                <tr>
                  <th>Assistant</th>
                  {workDays?.map((day) => {
                    return <th key={day}>{day}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-lg px-4 py-2">Aimen Sahnoun</td>
                  {workDays?.map((day) => {
                    return (
                      <td className="border border-lg px-4 py-2" key={day}>
                        {parseInt((Math.random() * 8 + 1).toString())}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimeSheet;
