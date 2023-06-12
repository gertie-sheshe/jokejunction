import React from "react";
import useTheme from "@jokejunction/hooks/useTheme";
import useUser from "@jokejunction/hooks/useUser";
import { useRouter } from "next/router";

import ToggleButton from "@jokejunction/ui/ToggleButton/ToggleButton";
import styles from "./Header.module.scss";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const router = useRouter();
  const { user, setUser } = useUser();

  const handleToggleChange = () => {
    toggleTheme();
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");

    router.push("/");
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
        {user && (
          <nav className={styles.navigation}>
            <ul className={styles.list}>
              <li>
                <button
                  onClick={handleLogout}
                  className={styles.buttonTertiary}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
