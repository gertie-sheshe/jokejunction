import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import useScreenSize from "@jokejunction/hooks/useScreenSize";

import MobileTable from "@jokejunction/components/Table/MobileTable";
import AccessibleTable from "@jokejunction/components/Table/AccessibleTable";
import TableActionBar from "@jokejunction/components/TableActionBar";

import styles from "./TableContainer.module.scss";
import { Joke } from "@jokejunction/types";

interface TableContainerProps {
  jokes: Joke[];
  srSelected: string;
}

interface QueryParams {
  page?: string;
  perPage?: string;
  sort?: string;
  filter?: string;
}

const TableContainer: React.FC<TableContainerProps> = ({
  jokes,
  srSelected,
}) => {
  const { screenWidth, isInitialized } = useScreenSize();
  const [jokesData, setJokesData] = useState(jokes);

  const router = useRouter();

  const {
    page = "1",
    perPage = "5",
    sort,
    filter,
  } = getQueryParams(router.query);

  const queryArray = [page, perPage];

  if (sort !== undefined) {
    queryArray.push(sort);
  }

  if (filter !== undefined) {
    queryArray.push(filter);
  }

  return (
    <>
      <TableActionBar perPage={perPage} sort={sort} filter={filter} />
      <div className={isInitialized ? styles.display : styles.hidden}>
        {screenWidth > 768 && (
          <AccessibleTable srFriendly={false} jokes={jokesData} />
        )}
        {screenWidth < 769 && srSelected === "no" && (
          <MobileTable jokes={jokesData} />
        )}
        {screenWidth < 769 && srSelected === "yes" && (
          <AccessibleTable
            srFriendly={srSelected === "yes" ? true : false}
            jokes={jokesData}
          />
        )}
      </div>
    </>
  );
};

const getQueryParams = (query: QueryParams) => {
  const { page, perPage, sort, filter } = query;
  return {
    page,
    perPage,
    sort,
    filter,
  };
};

export default TableContainer;
