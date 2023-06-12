import React from "react";
import useTheme from "@jokejunction/hooks/useTheme";
import { useRouter } from "next/router";

import ToggleButton from "@jokejunction/ui/ToggleButton/ToggleButton";
import styles from "./Header.module.scss";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const router = useRouter();

  const handleToggleChange = () => {
    toggleTheme();
  };

  return (
    <header className={isDarkMode ? styles.headerDark : styles.headerLight}>
      <div className={styles.actionsContainer}>
        <ToggleButton
          width={22}
          height={22}
          label="Dark mode selection"
          isPressed={isDarkMode}
          isDarkMode={isDarkMode}
          handleToggleChange={handleToggleChange}
        />
      </div>
    </header>
  );
};

export default Header;
