//React component
import { FunctionComponent, useState, useRef } from "react";

//FramerMotion import
import { motion, AnimatePresence } from "framer-motion";

//Utils import
import { dashboardTabsVariants } from "../../utils/page-transition";

//Icons import
import { RiArrowUpSLine } from "react-icons/ri";

//recoil import
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/state";

//Component import
import CustomImage from "../customImage/customImage";

//supabase import
import supabase from "../../utils/supabase";
import { uploadFile } from "../../utils/upload-file";
import { toast } from "react-toastify";

const EmployeesContent: FunctionComponent = () => {
  //Tabs for settings page
  const tabs = ["Account Settings", "Preferences"];

  //Languages
  const langs = ["English", "Turkish"];

  //Current tab
  const [currentTab, setCurrentTab] = useState(0);

  //Tracking drop down state
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //Recoil state
  const [user, setUser] = useRecoilState(userState);

  const profileImageRef = useRef(null);

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
                <div className="w-[3rem] h-[3rem] rounded-lg bg-bt-tab-bg relative">
                  <CustomImage
                    src={user?.imgUrl}
                    width="100%"
                    height="100%"
                    alt="profile picture"
                    layout="fill"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="flex gap-x-2">
                  <input
                    type="file"
                    className="hidden"
                    ref={profileImageRef}
                    accept="image/*"
                    onChange={async () => {
                      const file = profileImageRef.current?.files?.[0];
                      if (!file) return;
                      setIsLoading(true);
                      const url = await uploadFile(file, "image");
                      console.log(url);
                      const { data, error } = await supabase
                        .from("workers")
                        .update({
                          imgUrl: url,
                        })
                        .match({ id: user?.id });

                      if (error) {
                        console.log(error);
                        toast.error(error, {
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

                      const result = await supabase
                        .from("workers")
                        .select()
                        .match({ id: user?.id });

                      setUser(result.data[0]);
                      setIsLoading(false);
                    }}
                  />

                  <button
                    className="outline-none w-fit h-[2.5rem] rounded-lg bg-bt-purple text-white text-[1.1rem] p-2 "
                    onClick={async () => {
                      profileImageRef.current?.click();
                    }}
                  >
                    Change Profile Picture
                  </button>
                  <button
                    className="outline-none w-fit h-[2.5rem] rounded-lg bg-bt-tab-bg text-white text-[1.1rem] p-2 "
                    onClick={async () => {
                      if (
                        user?.imgUrl ===
                        "https://bafybeihj2j6solt4kbl6doc7w2vw7e5eqgc66fsuzpattjnn4mjhxici7y.ipfs.dweb.link/avatar.png"
                      )
                        return;
                      const { data, error } = await supabase
                        .from("workers")
                        .update({
                          imgUrl:
                            "https://bafybeihj2j6solt4kbl6doc7w2vw7e5eqgc66fsuzpattjnn4mjhxici7y.ipfs.dweb.link/avatar.png",
                        })
                        .match({ id: user?.id });

                      const result = await supabase
                        .from("workers")
                        .select()
                        .match({ id: user?.id });

                      setUser(result.data[0]);
                    }}
                  >
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
                      value={user?.name}
                      className="bg-bt-tab-bg w-[15rem] outline-none focus:border-gray-300 p-2 rounded-lg"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              </div>
              {/* Password */}
              <div className="flex gap-x-6 mb-10">
                <div>
                  <span className="font-medium text-[1.2rem]">
                    New Password:
                  </span>
                  <div className="items-center gap-x-6">
                    <input
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-bt-tab-bg w-[15rem] outline-none focus:border-gray-300 p-2 rounded-lg"
                      placeholder="New Password"
                      type="password"
                    />
                  </div>
                </div>
              </div>

              <button
                className="outline-none w-fit h-[2.5rem] rounded-lg bg-bt-tab-bg text-white text-[1.1rem] p-2 "
                onClick={async () => {
                  if (newPassword.length < 6)
                    return alert("Password must be at least 6 characters long");
                  setIsLoading(true);
                  const { data, error } = await supabase.auth.update({
                    password: newPassword,
                  });
                  setIsLoading(false);
                }}
              >
                {isLoading ? "Loading..." : "Change Password"}
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
                    return (
                      <span
                        key={lang}
                        className="cursor-pointer hover:bg-gray-500"
                      >
                        {lang}
                      </span>
                    );
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
