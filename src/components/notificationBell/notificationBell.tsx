//React import
import { FunctionComponent, useState, useEffect } from "react";

//Icons import
import { VscBell } from "react-icons/vsc";

//Animation import
import gsap from "gsap";

//Recoil import
import { useRecoilState, useRecoilValue } from "recoil";
import {
  notificationModalState,
  notificationState,
  userState,
  Notification,
} from "../../recoil/state";

interface NotificationBellProps {
  hasNotifications: boolean;
}

const NotificationBell: FunctionComponent<NotificationBellProps> = ({
  hasNotifications,
}) => {
  //Recoil state
  const notifications = useRecoilValue(notificationState);
  const user = useRecoilValue(userState);
  const [notificationModal, setNotificationModal] = useRecoilState(
    notificationModalState
  );

  //Use state
  const [myNotifications, setMyNotifications] = useState<Notification[]>([]);
  const [hasUnread, setHasUnread] = useState<boolean>(false);

  useEffect(() => {
    if (notifications.length > 0) {
      setMyNotifications(
        notifications.filter(
          (notification) => notification.sent_to === user?.id
        )
      );
    }
  }, [notifications]);

  useEffect(() => {
    if (myNotifications.length === 0) setHasUnread(false);
    else
      setHasUnread(
        myNotifications.some((notification) => notification.isRead === false)
      );
  }, [myNotifications]);


  return (
    <>
      <VscBell
        className="h-full w-full cursor-pointer bell"
        onClick={() => {
          gsap.set(".bell", { transformOrigin: "top center" });
          gsap.fromTo(
            ".bell",
            { rotate: -5 },
            { rotate: 0, duration: 2, ease: "elastic.out(5 , .2)" }
          );
          setNotificationModal(!notificationModal);
        }}
      />
      {hasUnread ? (
        <>
          <div className="w-[.5rem] h-[.5rem] bg-red-600 rounded-full absolute right-1 top-0 animate-ping" />
          <div className="w-[.5rem] h-[.5rem] bg-red-600 rounded-full absolute right-1 top-0 " />
        </>
      ) : null}
    </>
  );
};

export default NotificationBell;
