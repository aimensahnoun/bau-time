//NextJS import
import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

//React import
import { useState, ReactElement } from "react";

//Component import
import NotificationBell from "../components/notificationBell/notificationBell";
import DashTab from "../components/dashTab/dashTab";
import DashboardContent from "../components/dashboardContent/dashboardContent";
import UnitContent from "../components/unitContent/unitContent";

//Icons import
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import { RiSettings4Fill } from "react-icons/ri";
import { CgLogOut } from "react-icons/cg";

//CSS import
import styles from "../styles/dashboard.module.css";

const Dashboard: NextPage = () => {
  const router = useRouter();

  //Current tab index
  const [currentTab, setCurrentTab] = useState(0);

  //Tabs array
  const tabs = [
    {
      title: "Dashboard",
      Icon: <MdOutlineSpaceDashboard className="h-[1.5rem] w-[1.5rem]" />,
    },
    {
      title: "Units",
      Icon: <HiOutlineOfficeBuilding className="h-[1.5rem] w-[1.5rem]" />,
    },
    {
      title: "Employees",
      Icon: <FiUsers className="h-[1.5rem] w-[1.5rem]" />,
    },
    {
      title: "Settings",
      Icon: <RiSettings4Fill className="h-[1.5rem] w-[1.5rem]" />,
    },
  ];

  //Render content based on tab
  const rendedBody = (): ReactElement => {
    switch (currentTab) {
      case 0:
        return <DashboardContent />;
      case 1:
        return <UnitContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="w-screen h-screen">
      <Head>
        <title>BAU Time | Dashboard</title>
      </Head>

      {/* Navbar */}
      <nav className="h-[5rem] w-full bg-bt-accent-bg border-b-[1px] border-bt-dark-gray p-2 flex items-center justify-between">
        <h1 className="font-bold text-[1.5rem] ml-5 pt-2  overflow-hidden">
          BAUTime.
        </h1>

        <div className="flex items-center gap-x-4">
          <div className="w-[1.5rem] h-[1.rem] relative">
            <NotificationBell hasNotifications={true} />
          </div>
          <div className="h-10 w-10 bg-gray-300 rounded-lg mr-6">
            <Image
              src={
                "https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              }
              className="rounded-lg object-cover"
              alt="profile-avatar"
              width={"100%"}
              height={"100%"}
            />
          </div>
        </div>
      </nav>

      {/* Body */}
      <div className={`flex ${styles.sidebar}`}>
        {/* SideBar */}
        <div className=" lg:w-[15rem] 2xl:w-[20rem] flex flex-col items-center bg-bt-accent-bg  justify-between">
          <div className="w-[70%] h-[6rem] bg-bt-tab-bg lg:translate-y-5 2xl:translate-y-20 rounded-lg flex flex-col justify-center items-center">
            <span className="font-semibold lg:text-[1.1rem] 2xl:text-[1.2rem]">
              Created Unit Count
            </span>
            <span className="font-semibold text-[1.2rem]">0</span>
          </div>
          <div className="w-full h-full flex items-center  flex-col gap-y-4 justify-center lg:-translate-y-5 2xl:-translate-y-10">
            {tabs.map((tab, index) => {
              return (
                <DashTab
                  title={tab.title}
                  isActive={currentTab === index}
                  key={index}
                  onClick={() => setCurrentTab(index)}
                >
                  {tab.Icon}
                </DashTab>
              );
            })}
          </div>

          <div className="w-full h-full flex justify-center flex-1 mb-6">
            <DashTab
              title="Logout"
              isActive={false}
              onClick={() => {
                router.push("/");
              }}
              className=""
            >
              <CgLogOut className="h-[1.5rem] w-[1.5rem]" />
            </DashTab>
          </div>
        </div>

        {/* Content */}
        {rendedBody()}
      </div>
    </div>
  );
};

export default Dashboard;
