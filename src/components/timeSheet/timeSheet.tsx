//React import
import { FunctionComponent, useState, useEffect, useLayoutEffect } from "react";

//Icon import
import { AiOutlineDown } from "react-icons/ai";

//Utils import
import { timeSheetAnimation } from "../../utils/page-transition";
//FramerMotion import
import { motion, AnimatePresence } from "framer-motion";
import { Timesheet } from "../../recoil/state";
import { timeStamp } from "console";

//Supabase import
import supabase from "../../utils/supabase";

interface TimeSheetProps {
  timesheet: Timesheet;
}

const TimeSheet: FunctionComponent<TimeSheetProps> = ({ timesheet }) => {
  //Use State
  const [isOpen, setIsOpen] = useState(false);
  const [timeSheetData, setTimeSheetData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log(timeSheetData);
  }, [timeSheetData]);

  useEffect(() => {
    const array = [];
    const keys = Object.keys(timesheet.timesheet).filter((key) => {
      return key !== "days";
    });

    keys.forEach((key) => {
      array.push({ assistant: key, hours: timesheet.timesheet[key] });
    });

    setTimeSheetData(array);
  }, []);

  const parseDate = (date) => {
    const input = !isNaN(date) ? parseInt(date) : date;
    var tempDate = new Date(input);
    const splitDate = tempDate.toString().split(" ");

    return `${splitDate[1]}, ${splitDate[3]}`;
  };

  return (
    <div className="w-full select-none">
      <div
        className="flex items-center justify-between p-2 hover:bg-bt-dark-gray rounded-lg cursor-pointer mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[1.5rem] font-medium">
          {parseDate(timesheet.month)}
        </span>
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
            <div className="flex w-full justify-end items-center gap-x-4">
              {!timesheet.submitted && (
                <button
                  className="h-[2rem] bg-bt-dark-gray rounded-lg p-2 flex items-center justify-center"
                  onClick={async () => {
                    if (isEditing) {
                      let newData = {
                        days: timesheet.timesheet?.days,
                      };
                      timeSheetData.forEach((data) => {
                        newData[data.assistant] = data.hours;
                      });

                      const { data, error } = await supabase
                        .from("timesheets")
                        .update({ timesheet: newData })
                        .match({ month: timesheet.month });

                      if (error) console.log(error);
                    }
                    setIsEditing(!isEditing);
                  }}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              )}
              {!isEditing && !timesheet.submitted && (
                <button className="h-[2rem] bg-bt-dark-gray rounded-lg p-2 flex items-center justify-center">
                  {" "}
                  Submit
                </button>
              )}
            </div>
            <table className="table-auto">
              <thead>
                <tr>
                  <th>Assistant</th>
                  {timesheet.timesheet?.days?.map((day) => {
                    return <th key={day}>{day}</th>;
                  })}
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {timeSheetData.map((data) => {
                  return (
                    <tr key={data.assistant}>
                      <td className="border border-lg px-4 py-2">
                        {data.assistant}
                      </td>
                      {data.hours?.map((hour, index) => {
                        return (
                          <td
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onInput={(e) => {
                              var temp = [...timeSheetData];
                              for (let i = 0; i < temp.length; i++) {
                                if (temp[i].assistant === data.assistant) {
                                  let newHours = [...temp[i].hours];
                                  newHours[index] = isNaN(
                                    parseInt(e.target.innerText)
                                  )
                                    ? 0
                                    : parseInt(e.target.innerText);
                                  temp[i].hours = newHours;
                                }
                              }
                              setTimeSheetData(temp);
                            }}
                            className="border border-lg px-4 py-2"
                            key={index}
                          >
                            {hour}
                          </td>
                        );
                      })}

                      <td className="border border-lg px-4 py-2">
                        {data.hours.reduce(
                          (previousValue, currentValue) =>
                            previousValue + currentValue,
                          0
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimeSheet;
