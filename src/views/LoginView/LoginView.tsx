import React from "react";
import Image from "next/image";
import useTheme from "@jokejunction/hooks/useTheme";
import LoginForm from "@jokejunction/components/LoginForm";
import styles from "./LoginView.module.scss";

const LoginView = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={styles.mainContainer}>
      <div
        className={
          isDarkMode ? styles.pageContainerDark : styles.pageContainerLight
        }
      >
        <div className={styles.formContainer}>
          <h1
            className={`${styles.h1} ${
              isDarkMode ? styles.pageTitleDark : styles.pageTitleLight
            }`}
          >
            Get Started with Login
          </h1>
          <LoginForm className={styles.form} isDarkMode={isDarkMode} />
        </div>
        <div
          className={
            isDarkMode
              ? styles.descriptionContainerDark
              : styles.descriptionContainerLight
          }
        >
          <p className={styles.description}>
            <span className={styles.highlighted}>Laugh Data Revealed:</span>{" "}
            Gain Deeper Understanding of Jokes Worldwide
          </p>
          <Image priority width="500" height="500" alt="" src="/login-5.svg" />
        </div>
      </div>
    </div>
  );
};

export default LoginView;
