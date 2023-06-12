import React, { ReactNode } from "react";
import useTheme from "@jokejunction/hooks/useTheme";

import styles from "./Page.module.scss";

interface ContainerProps {
  children: ReactNode;
}

function Page({ children }: ContainerProps) {
  const { isDarkMode } = useTheme();

  if (!children) return null;
  return (
    <div className={isDarkMode ? styles.containerDark : styles.containerLight}>
      {children}
    </div>
  );
}

export default Page;
