//React import
import { FunctionComponent, useState, useEffect } from "react";

//Recoil import
import { useRecoilValue } from "recoil";
import {
  notificationModalState,
  Notification,
  notificationState,
  userState,
  employeesState,
} from "../../recoil/state";

//FramerMotion import
import { motion, AnimatePresence } from "framer-motion";
import { notifcationModalAnimation } from "../../utils/page-transition";
import CustomImage from "../customImage/customImage";

//supabase import
import supabase from "../../utils/supabase";

const NotificationModal: FunctionComponent = () => {
  //Recoil state
  const isModalOpen = useRecoilValue(notificationModalState);
  const notifications = useRecoilValue(notificationState);
  const user = useRecoilValue(userState);
  const employees = useRecoilValue(employeesState);

  //Use state
  const [myNotifications, setMyNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (notifications.length > 0) {
      setMyNotifications(
        notifications.filter(
          (notification) => notification.sent_to === user?.id
        )
      );
    }
  }, [notifications]);

  return (
    <AnimatePresence exitBeforeEnter>
      {isModalOpen && (
        <motion.div
          initial="hidden"
          animate="enter"
          exit="hidden"
          variants={notifcationModalAnimation}
          className="absolute right-[5rem] z-20 top-[5rem] w-[20rem] max-h-[25rem] overflow-x-hidden overflow-y-auto bg-white rounded-md shadow-lg  dark:bg-gray-800"
        >
          <div className="py-2 flex flex-col flex-wrap max-w-[10rem] static cursor-pointer">
            {myNotifications.map((notification) => {
              const sender = employees.find(
                (employee) => employee.id === notification.sender
              );
              return (
                <div
                  onClick={async () => {
                    if (notification.isRead) return;
                    const { data, error } = await supabase
                      .from("notifications")
                      .update({ isRead: true })
                      .match({
                        id: notification.id,
                      });

                    if (error) console.log(error);
                  }}
                  key={notification.id}
                  className={`flex flex-col flex-wrap  gap-y-2 p-2 w-[20rem] border-b border-gray-700 ${
                    !notification.isRead && "bg-bt-dark-gray"
                  } `}
                >
                  <div className="flex gap-x-2 items-center">
                    <div className="relative w-[2.5rem] h-[2.5rem] rounded-full">
                      <CustomImage
                        alt="avatar"
                        height="100%"
                        width="100%"
                        layout="fill"
                        className="rounded-full"
                        src={sender?.imgUrl}
                      />
                    </div>

                    <span>{sender?.name}</span>
                  </div>
                  <span>{notification.message}</span>
                </div>
              );
            })}
          </div>
          <a
            href="#"
            onClick={async () => {
              myNotifications.forEach(async (notification) => {
                if(notification.isRead) return;
                const { data, error } = await supabase
                  .from("notifications")
                  .update({ isRead: true })
                  .match({
                    id: notification.id,
                  });

                if (error) console.log(error);
              });
            }}
            className="block sticky bottom-0 py-2 font-bold text-center text-white bg-gray-800 dark:bg-gray-700 hover:underline"
          >
            Mark All As Read
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;
