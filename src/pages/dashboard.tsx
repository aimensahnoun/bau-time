//NextJS import
import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";

//Component import
import NotificationBell from "../components/notificationBell/notificationBell";

//CSS import
import styles from "../styles/dashboard.module.css";

const Dashboard: NextPage = () => {
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
        <div className="w-[20rem] bg-bt-accent-bg"></div>
        <div className={`${styles.body}`}></div>
      </div>
    </div>
  );
};

export default Dashboard;
