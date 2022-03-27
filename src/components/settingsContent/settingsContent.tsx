//React component
import { FunctionComponent, useState } from "react";

//ReactJS import
import Image from "next/image";

//FramerMotion import
import { motion, AnimatePresence } from "framer-motion";

//Utils import
import { dashboardTabsVariants } from "../../utils/page-transition";

//Icons import
import { RiArrowUpSLine } from "react-icons/ri";

const EmployeesContent: FunctionComponent = () => {
  //Tabs for settings page
  const tabs = ["Account Settings", "Preferences"];

  //Languages
  const langs = ["English", "Turkish"];

  //Current tab
  const [currentTab, setCurrentTab] = useState(0);

  //Tracking drop down state
  const [dropDownOpen, setDropDownOpen] = useState(false);

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
          {/* Tabs bar */}
          <div className="flex gap-x-3">
            {tabs.map((tab, index) => {
              return (
                <div
                  key={tab}
                  onClick={() => setCurrentTab(index)}
                  className={`w-fit h-[3rem] rounded-lg select-none flex items-center justify-center p-2 font-medium text-[1.3rem] cursor-pointer duration-300 transition-all ${
                    currentTab === index
                      ? "border-bt-tab-bg border-[1px]"
                      : "opacity-50 hover:opacity-100"
                  } `}
                >
                  <span>{tab}</span>
                </div>
              );
            })}
          </div>

          {/* Seperator */}
          <hr className="w-full border-bt-dark-gray" />

          {/*  Content */}

          {currentTab === 0 ? (
            <section className="flex flex-col gap-y-2">
              {/* Profile Image */}
              <span className="font-medium text-[1.2rem]">
                Profile Picture:
              </span>

              <div className="flex items-center gap-x-6 mb-4">
                <div className="w-[3rem] h-[3rem] rounded-lg bg-bt-tab-bg">
                  <Image
                    src="https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    width="100%"
                    height="100%"
                    alt="profile picture"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="flex gap-x-2">
                  <button className="outline-none w-fit h-[2.5rem] rounded-lg bg-bt-purple text-white text-[1.1rem] p-2 ">
                    Change Profile Picture
                  </button>
                  <button className="outline-none w-fit h-[2.5rem] rounded-lg bg-bt-tab-bg text-white text-[1.1rem] p-2 ">
                    Delete Profile Picture
                  </button>
                </div>
              </div>

              {/* Full Name & username*/}
              <div className="flex gap-x-6 mb-4">
                <div>
                  <span className="font-medium text-[1.2rem]">Full Name:</span>
                  <div className="items-center gap-x-6">
                    <input
                      className="bg-bt-tab-bg w-[15rem] outline-none focus:border-gray-300 p-2 rounded-lg"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div>
                  <span className="font-medium text-[1.2rem]">Username:</span>
                  <div className="items-center gap-x-6">
                    <input
                      className="bg-bt-tab-bg w-[15rem] outline-none focus:border-gray-300 p-2 rounded-lg"
                      placeholder="john.doe"
                    />
                  </div>
                </div>
              </div>
              {/* Password */}
              <div className="flex gap-x-6 mb-10">
                <div>
                  <span className="font-medium text-[1.2rem]">
                    Old Password:
                  </span>
                  <div className="items-center gap-x-6">
                    <input
                      className="bg-bt-tab-bg w-[15rem] outline-none focus:border-gray-300 p-2 rounded-lg"
                      placeholder="Old Password"
                      type="password"
                    />
                  </div>
                </div>
                <div>
                  <span className="font-medium text-[1.2rem]">
                    New Password:
                  </span>
                  <div className="items-center gap-x-6">
                    <input
                      className="bg-bt-tab-bg w-[15rem] outline-none focus:border-gray-300 p-2 rounded-lg"
                      placeholder="New Password"
                      type="password"
                    />
                  </div>
                </div>
              </div>

              <button className="outline-none w-fit h-[2.5rem] rounded-lg bg-bt-tab-bg text-white text-[1.1rem] p-2 ">
                Save Changes
              </button>
            </section>
          ) : (
            <section className="flex-col flex gap-y-6">
              <div className="flex flex-col gap-y-2 relative">
                <span className="font-medium text-[1.2rem]">Language:</span>
                <div
                  className="bg-bt-tab-bg w-[7rem] h-[2rem] p-2 rounded-lg flex items-center justify-between select-none cursor-pointer"
                  onClick={() => setDropDownOpen(!dropDownOpen)}
                >
                  <span>English</span>
                  <RiArrowUpSLine
                    className={`duration-300 transition-all ${
                      dropDownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div
                  className={`w-[7rem] h-[5rem] bg-bt-tab-bg rounded-lg p-2 flex flex-col gap-x-2 overflow-scroll ${
                    dropDownOpen ? "visible" : "invisible"
                  } `}
                >
                  {langs.map((lang, index) => {
                    return <span key={lang} className="cursor-pointer hover:bg-gray-500">{lang}</span>;
                  })}
                </div>
              </div>
              <button className="outline-none w-fit h-[2.5rem] rounded-lg bg-bt-tab-bg text-white text-[1.1rem] p-2 ">
                Save Changes
              </button>
            </section>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmployeesContent;
