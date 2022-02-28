//React import
import {FunctionComponent } from "react"

//NextJS import
import Image from "next/image"

//Icon import
import { AiOutlineHourglass } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";

const UnitComponent : FunctionComponent = () => {
    return   <div
    className={`h-[12rem] bg-bt-dark-gray rounded-xl flex flex-col items-center justify-between py-3 transition-all cursor-pointer duration-300 select-none w-[11rem]
`}
  >
    {/* Unit Logo */}
    <div className="w-[3rem] h-[3rem] bg-white rounded-full  -translate-y-[1.7rem] ">
      <Image
        className="object-cover rounded-full"
        src={
          "https://yt3.ggpht.com/ytc/AKedOLRqfxjsxWJBNtziJ5XtVDx1BwbEYwmoJZxJFr-fJQ=s900-c-k-c0x00ffffff-no-rj"
        }
        alt="unit-logo"
        width="100%"
        height="100%"
      />
    </div>
    {/* Unit name */}
    <span
      className={`font-bold transition-all unit-title duration-500   `}
    >
      International Office
    </span>
    {/* Unit actions */}
    <div className="mt-auto flex justify-between gap-x-2">
      <div
        className="w-[1.7rem] h-[1.7rem] bg-[#565672] rounded-full flex items-center justify-center"
        onClick={(e) => {
          //Prevent parents onClick event
          e.stopPropagation();
        }}
      >
        <FiUsers />
      </div>
      <div
        className={`w-[1.7rem] h-[1.7rem] bg-[#565672] rounded-full flex items-center justify-center transition-all duration-300 `}
        onClick={(e) => {
          //Prevent parents onClick event
          e.stopPropagation();
        }}
      >
        <AiOutlineHourglass />
      </div>
    </div>
  </div>
}


export default UnitComponent