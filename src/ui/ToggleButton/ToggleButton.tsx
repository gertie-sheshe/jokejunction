import React from "react";
import Image from "next/image";
import lightIcon from "../../../public/light-mode.svg";
import darkIcon from "../../../public/dark-mode.svg";

import styles from "./ToggleButton.module.scss";

interface ToggleButtonProps {
  className?: string;
  width?: number;
  height?: number;
  label: string;
  handleToggleChange: () => void;
  isPressed: boolean;
  isDarkMode: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  className,
  width,
  height,
  label,
  handleToggleChange,
  isPressed,
  isDarkMode,
}) => {
  return (
    <button
      aria-pressed={isPressed}
      aria-label={label}
      onClick={handleToggleChange}
      className={`${
        isDarkMode ? styles.toggleButtonDark : styles.toggleButtonLight
      } ${className}`}
    >
      <Image
        className={isDarkMode ? styles.iconDark : styles.iconLight}
        src={isPressed ? lightIcon : darkIcon}
        alt=""
        width={width}
        height={height}
      />
    </button>
  );
};

export default ToggleButton;
