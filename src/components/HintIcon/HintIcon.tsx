import React from "react";
import Image from "next/image";
import styles from "./HintIcon.module.scss";

interface HintIconProps {
  isDarkMode: boolean;
}

const HintIcon: React.FC<HintIconProps> = ({ isDarkMode }) => {
  return (
    <div className={isDarkMode ? styles.hintIconDark : styles.hintIconLight}>
      <Image priority src="/login-5.svg" width="300" height="300" alt="" />
    </div>
  );
};

export default HintIcon;
