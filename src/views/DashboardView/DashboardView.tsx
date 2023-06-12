import React, { useState } from "react";
import Pagination from "@jokejunction/components/Pagination";
import TableContainer from "@jokejunction/components/TableContainer";

import useScreenSize from "@jokejunction/hooks/useScreenSize";
import useTheme from "@jokejunction/hooks/useTheme";

import styles from "./DashboardView.module.scss";
import { Joke } from "@jokejunction/types";

interface DashboardViewProps {
  jokes: Joke[];
}

const DashboardView: React.FC<DashboardViewProps> = ({ jokes = [] }) => {
  const [srSelected, setSrSelected] = useState("no"); // screen reader access default to no. Chosen by user

  const { screenWidth } = useScreenSize();
  const { isDarkMode } = useTheme();

  const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSrSelected(event.target.value);
  };

  // Screen reader select only visible to screen reader users

  return (
    <div>
      <div>
        <h1
          className={`${styles.h3} ${
            isDarkMode ? styles.headerDark : styles.headerLight
          }`}
        >
          Jokes Dashboard
        </h1>
      </div>
      {screenWidth < 769 && (
        <div className={styles.srOnly}>
          <div>
            <label htmlFor="table">
              <p>Select screen reader friendly table:</p>
            </label>
            <select
              name="table"
              id="table"
              value={srSelected}
              onChange={handleTableChange}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      )}
      <TableContainer jokes={jokes} srSelected={srSelected} />
      <div className={styles.pagination}>
        <Pagination />
      </div>
    </div>
  );
};

export default DashboardView;
