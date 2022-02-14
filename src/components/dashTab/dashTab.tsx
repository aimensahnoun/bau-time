//React import
import { FunctionComponent } from "react";

interface DashTabProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const DashTab: FunctionComponent<DashTabProps> = ({
  title,
  children,
  isActive,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex gap-x-2 opacity-50 w-[60%] pl-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
        isActive ? "opacity-100 bg-bt-tab-bg scale-[1.1] shadow-md" : ""
      } ${className}`}
    >
      {children}
      <span className="text-[1.2rem]">{title}</span>
    </div>
  );
};

export default DashTab;
