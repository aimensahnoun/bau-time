//React imports
import { FunctionComponent, useState } from "react";

//css import
import styles from "./actionButton.module.css";

interface ActionButtonProps {
  text: string;
  className?: string;
}

const ActionButton: FunctionComponent<ActionButtonProps> = ({
  text,
  className,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 4000);
  };

  return (
    <div
      className={`h-[2rem] w-[10rem] relative bg-bt-form-bg rounded-lg flex justify-center items-center hover:cursor-pointer ${
        isClicked && styles.animate
      } ${styles.main} ${className}`}
      onClick={handleClick}
    >
      <h1>{text}</h1>
    </div>
  );
};

export default ActionButton;
