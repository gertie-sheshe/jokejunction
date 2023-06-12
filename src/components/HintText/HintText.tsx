import React from "react";
import styles from "./HintText.module.scss";

interface HintTextProps {
  isDarkMode: boolean;
  title: string;
}

const HintText: React.FC<HintTextProps> = ({ isDarkMode, title }) => {
  return (
    <div className={isDarkMode ? styles.hintTextDark : styles.hintTextLight}>
      {title ? (
        <p className={styles.text}>
          &quot;Edit like a comedian on a mission! Refine your joke and watch
          the laughter meter go off the charts.!&quot;
        </p>
      ) : (
        <p className={styles.text}>
          &quot;Ready to unleash your comedic genius? Let us create a
          masterpiece!&quot;
        </p>
      )}
    </div>
  );
};

export default HintText;
