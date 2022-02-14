//React import
import { FunctionComponent } from "react";

//Icons import
import { VscBell } from "react-icons/vsc";

//Animation import
import gsap from "gsap";

interface NotificationBellProps {
  hasNotifications: boolean;
}

const NotificationBell: FunctionComponent<NotificationBellProps> = ({
  hasNotifications,
}) => {
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
        }}
      />
      {hasNotifications ? (
        <>
          <div className="w-[.5rem] h-[.5rem] bg-red-600 rounded-full absolute right-1 top-0 animate-ping" />
          <div className="w-[.5rem] h-[.5rem] bg-red-600 rounded-full absolute right-1 top-0 " />
        </>
      ) : null}
    </>
  );
};

export default NotificationBell;
