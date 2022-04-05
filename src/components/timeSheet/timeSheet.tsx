//React import
import { FunctionComponent, useState, useEffect, useLayoutEffect } from "react";

//Icon import
import { AiOutlineDown } from "react-icons/ai";

//Utils import
import { timeSheetAnimation } from "../../utils/page-transition";
//FramerMotion import
import { motion, AnimatePresence } from "framer-motion";
import { Timesheet } from "../../recoil/state";

//Supabase import
import supabase from "../../utils/supabase";

//Recoil import
import { useRecoilValue } from "recoil";
import { employeesState, userState } from "../../recoil/state";

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

//Id generator
import { v4 as uuidv4 } from 'uuid';
interface TimeSheetProps {
  timesheet: Timesheet;
  unitName: string;
}

const TimeSheet: FunctionComponent<TimeSheetProps> = ({
  timesheet,
  unitName,
}) => {
  //Use State
  const [isOpen, setIsOpen] = useState(false);
  const [timeSheetData, setTimeSheetData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const employees = useRecoilValue(employeesState);
  const user = useRecoilValue(userState);

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
            className="flex flex-col gap-y-[2rem] overflow-y-scroll"
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
                        .match({
                          month: timesheet.month,
                          unitId: timesheet.unitId,
                        });

                      if (error) console.log(error);
                    }
                    setIsEditing(!isEditing);
                  }}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              )}
              {!isEditing && !timesheet.submitted && (
                <button
                  className="h-[2rem] bg-bt-dark-gray rounded-lg p-2 flex items-center justify-center"
                  onClick={async () => {
                    const { data, error } = await supabase
                      .from("timesheets")
                      .update({ submitted: true })
                      .match({
                        month: timesheet.month,
                        unitId: timesheet.unitId,
                      });

                    const result = await supabase.from("notifications").insert({
                      message: `${unitName} has submitted the timesheet for ${parseDate(
                        timesheet.month
                      )}`,
                      sent_to: "db7f30da-155e-4f34-83bf-6947569d58b4",
                      sender: user?.id,
                      isRead: false,
                      id : uuidv4()
                    });

                    if (result.error) console.log(result.error);

                    if (error) console.log(error);
                  }}
                >
                  {" "}
                  Submit
                </button>
              )}
              <button
                className="h-[2rem] bg-bt-dark-gray rounded-lg p-2 flex items-center justify-center"
                onClick={async () => {
                  const workbook = new ExcelJS.Workbook();
                  const sheet = workbook.addWorksheet("Timesheet");

                  sheet.addRow(["Month : " + parseDate(timesheet.month)]).font =
                    {
                      size: 16,
                      bold: true,
                    };
                  sheet.addRow(["Unit : " + unitName]).font = {
                    size: 16,
                    bold: true,
                  };
                  sheet.addRow([
                    "Assistant",
                    "Student Number",
                    ...timesheet.timesheet?.days,
                    "Total",
                  ]).font = {
                    size: 16,
                    bold: true,
                  };

                  timeSheetData.forEach((data) => {
                    sheet.addRow([
                      data.assistant,
                      employees.filter((e) => {
                        return e.name === data?.assistant;
                      })[0].studentNumber,
                      ...data.hours,
                      data.hours.reduce((a, b) => a + b, 0),
                    ]).border = {
                      top: { style: "double", color: { argb: "000" } },
                      left: { style: "double", color: { argb: "000" } },
                      bottom: { style: "double", color: { argb: "000" } },
                      right: { style: "double", color: { argb: "000" } },
                    };
                  });
                  const buffer = await workbook.xlsx.writeBuffer();
                  const fileType =
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                  const fileExtension = ".xlsx";

                  const blob = new Blob([buffer], { type: fileType });

                  saveAs(
                    blob,
                    `TimeSheet_${unitName}_${parseDate(timesheet.month)}` +
                      fileExtension
                  );
                }}
              >
                Export Excel
              </button>
            </div>
            <table className="table-auto xl:text-[.8rem] overflow-x-scroll w-[100%]">
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
                      <td className="border border-lg xl:px-2 2x:px-4 py-2">
                        {data.assistant}
                      </td>
                      {data.hours?.map((hour, index) => {
                        return (
                          <td
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            cur
                            onInput={(e) => {
                              var temp = [...timeSheetData];
                              for (let i = 0; i < temp.length; i++) {
                                if (temp[i].assistant === data.assistant) {
                                  let newHours = [...temp[i].hours];
                                  newHours[index] = isNaN(
                                    parseFloat(e.target.innerText)
                                  )
                                    ? 0
                                    : parseFloat(e.target.innerText);
                                  temp[i].hours = newHours;
                                }
                              }
                              setTimeSheetData(temp);
                            }}
                            className="border border-lg xl:px-2 2x:px-4"
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
