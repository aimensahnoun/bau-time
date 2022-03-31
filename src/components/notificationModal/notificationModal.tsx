//React import
import { FunctionComponent } from "react";

//Recoil import
import { useRecoilValue } from "recoil";
import { notificationModalState } from "../../recoil/state";

//FramerMotion import
import { motion, AnimatePresence } from "framer-motion";
import { notifcationModalAnimation } from "../../utils/page-transition";
import CustomImage from "../customImage/customImage";

const NotificationModal: FunctionComponent = () => {
  const isModalOpen = useRecoilValue(notificationModalState);

  return (
    <AnimatePresence exitBeforeEnter>
      {isModalOpen && (
        <motion.div
          variants={notifcationModalAnimation}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ type: "linear" }}
          className={`w-[20rem] h-[24rem] overflow-auto absolute flex flex-col top-[5rem] right-[1.5rem] bg-bt-accent-bg rounded-b-xl shadow-2xl gap-y-[7rem]`}
        >
          <div className="flex flex-col gap-y-[7rem] p-3">
            <div className="flex flex-wrap bg-bt-dark-gray w-[18rem] p-2 rounded-t-lg">
              <div className="w-[3rem] h-[3rem] rounded-full bg-bt-dark-gray relative">
                <CustomImage
                  src="https://bafybeihj2j6solt4kbl6doc7w2vw7e5eqgc66fsuzpattjnn4mjhxici7y.ipfs.dweb.link/avatar.png"
                  alt="user profile image"
                  height="100%"
                  width="100%"
                  layout="fill"
                  className="rounded-full"
                />
                <div className="flex flex-col ml-[3.5rem]">
                  <span>Username </span>
                  <span>Office </span>
                </div>
                <p className="w-[18rem] block break-words bg-bt-dark-gray p-2 -m-2 rounded-b-lg">
                  LooooooooooōLooooooooooōLooooooooooōLooooooooooōLooooooooooōLooooooooooōLooooooooooōLooooooooooō
                </p>
              </div>
            </div>
            <div className="flex flex-wrap bg-bt-dark-gray w-[18rem] p-2 rounded-t-lg">
              <div className="w-[3rem] h-[3rem] rounded-full bg-bt-dark-gray relative">
                <CustomImage
                  src="https://bafybeihj2j6solt4kbl6doc7w2vw7e5eqgc66fsuzpattjnn4mjhxici7y.ipfs.dweb.link/avatar.png"
                  alt="user profile image"
                  height="100%"
                  width="100%"
                  layout="fill"
                  className="rounded-full"
                />
                <div className="flex flex-col ml-[3.5rem]">
                  <span>Username </span>
                  <span>Office </span>
                </div>
                <p className="w-[18rem] block break-words bg-bt-dark-gray p-2 -m-2 rounded-b-lg">
                  LooooooooooōLooooooooooōLooooooooooōLooooooooooōLooooooooooōLooooooooooōLooooooooooōLooooooooooō
                </p>
              </div>
            </div>
            <div className="flex flex-wrap bg-bt-dark-gray w-[18rem] p-2 rounded-t-lg">
              <div className="w-[3rem] h-[3rem] rounded-full bg-bt-dark-gray relative">
                <CustomImage
                  src="https://bafybeihj2j6solt4kbl6doc7w2vw7e5eqgc66fsuzpattjnn4mjhxici7y.ipfs.dweb.link/avatar.png"
                  alt="user profile image"
                  height="100%"
                  width="100%"
                  layout="fill"
                  className="rounded-full"
                />
                <div className="flex flex-col ml-[3.5rem]">
                  <span>Username </span>
                  <span>Office </span>
                </div>
                <p className="w-[18rem] block break-words bg-bt-dark-gray p-2 -m-2 rounded-b-lg">
                  LooooooooooōLooooooooooōLooooooooooōLooooooooooōLooooooooooōLooooooooooōLooooooooooōLooooooooooō
                </p>
              </div>
            </div>
          </div>

          <div className="cursor-pointer p-2 sticky bottom-0 bg-bt-bg w-full flex items-center justify-center z-50 -mb-[5rem]">
            <span>Mark All As Read</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;
