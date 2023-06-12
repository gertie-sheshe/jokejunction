import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import useTheme from "@jokejunction/hooks/useTheme";
import styles from "./TableActionBar.module.scss";

interface TableActionBarProps {
  perPage?: string;
  sort?: string;
  filter?: string;
}

const TableActionBar: React.FC<TableActionBarProps> = ({
  perPage,
  sort,
  filter,
}) => {
  const { isDarkMode } = useTheme();

  const router = useRouter();

  const [selectValues, setSelectValues] = useState({
    perPage: String(perPage),
    filter: "",
    sort: "",
  });

  useEffect(() => {
    // Update Select value to reflect URL
    setSelectValues((prevValues) => ({
      ...prevValues,
      ...(perPage && { perPage }),
      ...(sort && { sort }),
      ...(filter && { filter }),
    }));
  }, [perPage, sort, filter]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelectValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const updatedQuery = { ...router.query };

    if (selectValues.perPage !== "" && selectValues.perPage !== undefined) {
      updatedQuery.perPage = selectValues.perPage;
    } else {
      delete updatedQuery.perPage;
    }

    if (selectValues.sort !== "" && selectValues.sort !== undefined) {
      updatedQuery.sort = selectValues.sort;
    } else {
      delete updatedQuery.sort;
    }

    if (selectValues.filter !== "" && selectValues.filter !== undefined) {
      updatedQuery.filter = selectValues.filter;
    } else {
      delete updatedQuery.filter;
    }

    router.push({
      pathname: "/dashboard",
      query: updatedQuery,
    });
  };

  return (
    <div className={styles.tableActionsContainer}>
      <div className={styles.buttonContainer}>
        <Link
          href="/jokes/new"
          className={
            isDarkMode ? styles.primaryLinkDark : styles.primaryLinkLight
          }
        >
          Create New Joke
        </Link>
      </div>
      <div
        className={
          isDarkMode
            ? styles.actionsContainerDark
            : styles.actionsContainerLight
        }
      >
        <div className={styles.actions}>
          <div>
            <label
              className={isDarkMode ? styles.labelDark : styles.labelLight}
              htmlFor="perPage"
            >
              <p className={styles.labelText}>Per Page:</p>
            </label>
            <select
              className={isDarkMode ? styles.selectDark : styles.selectLight}
              name="perPage"
              id="perPage"
              value={selectValues.perPage}
              onChange={handleChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
          <div>
            <label
              className={isDarkMode ? styles.labelDark : styles.labelLight}
              htmlFor="filter"
            >
              <p className={styles.labelText}>Filter:</p>
            </label>
            <select
              className={isDarkMode ? styles.selectDark : styles.selectLight}
              name="filter"
              id="filter"
              value={selectValues.filter}
              onChange={handleChange}
            >
              <option value="">None</option>
              <option value="highestViews">Highest Views</option>
              <option value="lowestViews">Least Views</option>
              <option value="today">Created Today</option>
            </select>
          </div>
          <div>
            <label
              className={isDarkMode ? styles.labelDark : styles.labelLight}
              htmlFor="sort"
            >
              <p className={styles.labelText}>Sort:</p>
            </label>
            <select
              className={isDarkMode ? styles.selectDark : styles.selectLight}
              name="sort"
              id="sort"
              value={selectValues.sort}
              onChange={handleChange}
            >
              <option value="">None</option>
              <option value="views">Views</option>
              <option value="createdAt">Date</option>
            </select>
          </div>
        </div>
        <div className={styles.actionButton}>
          <button
            onClick={handleSubmit}
            className={
              isDarkMode
                ? styles.buttonSecondaryDark
                : styles.buttonSecondaryLight
            }
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableActionBar;
