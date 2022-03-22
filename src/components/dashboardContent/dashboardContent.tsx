//React component
import { FunctionComponent } from "react";

//FramerMotion import
import { motion, AnimatePresence } from "framer-motion";

//Component import
import Unit from "../unit/unit";

//Utils import
import { dashboardTabsVariants } from "../../utils/page-transition";

//Recoil content
import {useRecoilValue} from "recoil"
import { userState } from "../../recoil/state";

const DashboardContent: FunctionComponent = () => {
  //Recoil state
  const user = useRecoilValue(userState);

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        variants={dashboardTabsVariants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "linear" }}
        className={`dash-body p-10`}
      >
        <div className="flex flex-col gap-y-[1.5rem]">
          <span className="font-bold text-[1.5rem] ">
            Welcome Back, {user?.name.split(" ")[0]} 😊
          </span>
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
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DashboardContent;
