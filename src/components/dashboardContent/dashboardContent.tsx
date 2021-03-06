//React component
import { FunctionComponent, useState, useEffect } from "react";

//FramerMotion import
import { motion, AnimatePresence } from "framer-motion";

//Component import
import Unit from "../unit/unit";

//Utils import
import { dashboardTabsVariants } from "../../utils/page-transition";

//Recoil content
import { useRecoilValue, useRecoilState } from "recoil";
import {
  userState,
  employeesState,
  unitsState,
  selectedEmployeeState,
} from "../../recoil/state";

//supabase import
import supabase from "../../utils/supabase";

//Id generator
import { v4 as uuidv4 } from "uuid";
import EmployeeDetails from "../employeeDetails/employeeDetails";

//Toastify import
import { toast } from "react-toastify";


const DashboardContent: FunctionComponent = () => {
  //Recoil state
  const user = useRecoilValue(userState);
  const employees = useRecoilValue(employeesState);
  const units = useRecoilValue(unitsState);
  const [_selectedEmployee, setSelectedEmployee] = useRecoilState(
    selectedEmployeeState
  );

  //Use state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filteredEmployees, setFilteredEmployees] = useState(
    employees.filter((employee) => {
      return employee.isCreated === true;
    })
  );

  useEffect(() => {
    setFilteredEmployees(
      employees.filter((employee) => {
        return employee.isCreated === true;
      })
    );
  }, [employees]);

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        variants={dashboardTabsVariants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "linear" }}
        className={`xl:w-[calc(100%-15rem)] 2xl:w-[calc(100%-20rem)] xl:p-10 overflow-y-scroll pb-[10rem]`}
      >
        <div className="flex flex-col gap-y-[1.5rem]">
          <span className="font-bold text-[1.5rem] ">
            Welcome Back, {user?.name.split(" ")[0]} 😊
          </span>

          <div className="flex items-center gap-x-12">
            <div className="flex min-w-[17rem] overflow-x-scroll items-center scroll h-[20rem] gap-x-3 no-scrollbar">
              <Unit
                title="International Office"
                imgUrl="https://yt3.ggpht.com/ytc/AKedOLRqfxjsxWJBNtziJ5XtVDx1BwbEYwmoJZxJFr-fJQ=s900-c-k-c0x00ffffff-no-rj"
              />
              <Unit
                title="BAU Global"
                imgUrl="https://media-exp1.licdn.com/dms/image/C4D0BAQHCeO3i9azL7g/company-logo_200_200/0/1547474008762?e=2159024400&v=beta&t=LBYgr2t9m38A8UItRXtyPa88UufuRJDNRAa68nqf1eQ"
              />
              <Unit
                title="Erasmus"
                imgUrl="https://www.helixhelezon-courses.com/wp-content/uploads/2021/04/erasmus-logo.jpg"
              />
              <Unit
                title="DSO"
                imgUrl="https://pbs.twimg.com/profile_images/1326282709250027521/pWL6v77N_400x400.jpg"
              />
            </div>

            <div className="w-[50%] h-[15rem] flex flex-col gap-y-2 bg-bt-dark-gray rounded-lg overflow-y-scroll p-4">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => {
                  return (
                    <div
                      key={employee.id}
                      className="flex items-center justify-between"
                    >
                      <EmployeeDetails
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                      />
                      <div className="flex flex-col gap-y-2">
                        <span
                          className="cursor-pointer font-bold"
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setIsModalOpen(true);
                          }}
                        >
                          {employee.name}
                        </span>
                        <span>
                          {
                            units.filter((unit) => {
                              return unit.id === employee.office;
                            })[0]?.name
                          }
                        </span>
                      </div>

                      <div className="flex items-center gap-x-2">
                        <button
                          className="rounded-lg flex justify-center items-center bg-green-500 p-2 select-none"
                          onClick={async (e) => {
                            e.stopPropagation();
                            const { data, error } = await supabase
                              .from("workers")
                              .update({
                                isCreated: false,
                                isHidden: false,
                              })
                              .match({ id: employee.id });

                            const result = await supabase
                              .from("notifications")
                              .insert({
                                message: `${employee.name} has been accepted`,
                                sent_to: units.filter((unit) => {
                                  return unit.id === employee.office;
                                })[0]?.responsibleId,
                                sender: user?.id,
                                isRead: false,
                                id: uuidv4(),
                              });

                            const sending = await fetch(
                              "/api/sendAcceptEmail",
                              {
                                headers: {
                                  Accept: "application/json",
                                  "Content-Type": "application/json",
                                },
                                method: "POST",
                                body: JSON.stringify({
                                  name: employee.name,
                                  studentNumber: employee.studentNumber,
                                  unitName: units.filter((unit) => {
                                    return unit.id === employee.office;
                                  })[0]?.name,
                                  passport: employee.passport,
                                  form: employee.insurance,
                                  residencePermit: employee.residence,
                                  picture: employee.imgUrl,
                                }),
                              }
                            ).catch((e) => {
                              toast.error(e, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                              });
                            });

                            if (result.error) console.log(result.error);

                            if (error) {
                              toast.error(e, {
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
                          Accept
                        </button>
                        <button
                          className="rounded-lg flex justify-center items-center bg-red-600 p-2 select-none"
                          onClick={async (e) => {
                            e.stopPropagation();

                            const note = prompt(
                              "Please enter a reason for rejection"
                            );

                            const { data, error } = await supabase
                              .from("workers")
                              .update({
                                isCreated: false,
                                isHidden: true,
                              })
                              .match({ id: employee.id });

                            const result = await supabase
                              .from("notifications")
                              .insert({
                                message: `${employee.name} has been rejected because : ${note}`,
                                sent_to: units.filter((unit) => {
                                  return unit.id === employee.office;
                                })[0]?.responsibleId,
                                sender: user?.id,
                                isRead: false,
                                id: uuidv4(),
                              });

                            if (result.error) console.log(result.error);

                            if (error) {
                              console.log(error);
                            }
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <span>No new students to approve</span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DashboardContent;
