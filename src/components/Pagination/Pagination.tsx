import React from "react";
import { useRouter } from "next/router";

import styles from "./Pagination.module.scss";

const Pagination = () => {
  const router = useRouter();

  const { page } = router.query;
  const pageNum = Number(page);

  const handleNextPage = () => {
    const currentPage = pageNum || 1;
    const nextPage = currentPage + 1;
    router.push({
      pathname: "/dashboard",
      query: { ...router.query, page: nextPage },
    });
  };

  const handlePreviousPage = () => {
    const currentPage = pageNum || 1;
    const previousPage = Math.max(currentPage - 1, 1);
    router.push({
      pathname: "/dashboard",
      query: { ...router.query, page: previousPage },
    });
  };

  return (
    <div>
      <button
        onClick={handlePreviousPage}
        className={`${styles.buttonTertiary} ${styles.button}`}
      >
        Previous
      </button>
      <button onClick={handleNextPage} className={styles.buttonTertiary}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
