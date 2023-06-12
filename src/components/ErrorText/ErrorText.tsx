import React from "react";
import useTheme from "@jokejunction/hooks/useTheme";
import styles from "./ErrorText.module.scss";

interface ErrorTextProps {
  text: string;
}

const ErrorText: React.FC<ErrorTextProps> = ({ text }) => {
  const { isDarkMode } = useTheme();

  return (
    <span className={isDarkMode ? styles.errorTextDark : styles.errorTextLight}>
      {text}
    </span>
  );
};

export default ErrorText;
