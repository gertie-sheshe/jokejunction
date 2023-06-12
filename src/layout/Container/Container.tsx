import React, { ReactNode } from "react";
import styles from "./Container.module.scss";

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps) {
  if (!children) return null;

  return <div className={styles.container}>{children}</div>;
}

export default Container;
