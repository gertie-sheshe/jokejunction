import React from "react";
import Link from "next/link";
import useTheme from "@jokejunction/hooks/useTheme";
import { formatDate, getColorStyles } from "@jokejunction/utils/helpers";

import styles from "./Table.module.scss";
import { Joke } from "@jokejunction/types";

interface MobileTableProps {
  jokes: Joke[];
}

const MobileTable: React.FC<MobileTableProps> = ({ jokes }) => {
  const { isDarkMode } = useTheme();

  if (!jokes) return null;

  return (
    <div
      className={
        isDarkMode ? styles.tableWrapperDark : styles.tableWrapperLight
      }
    >
      <table
        className={styles.table}
        role="region"
        tabIndex={0}
        aria-labelledby="tableCaption"
      >
        <caption
          id="tableCaption"
          className={
            isDarkMode ? styles.tableCaptionDark : styles.tableCaptionLight
          }
        >
          List of jokes analysis
        </caption>
        <thead className={styles.mobileTableHead}>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Created Date</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          {jokes.map(({ id, title, author, createdAt, views }) => {
            const color = getColorStyles(views, styles);

            return (
              <tr key={id} className={styles.mobileTableRow}>
                <td className={styles.mobileTitle}>
                  <Link
                    className={isDarkMode ? styles.linkDark : styles.linkLight}
                    href={`/jokes/edit/${id}`}
                  >
                    {title}
                  </Link>
                </td>
                <td className={styles.mobileAuthor}>{author}</td>
                <td
                  className={
                    isDarkMode ? styles.mobileDateDark : styles.mobileDateLight
                  }
                >
                  {formatDate(createdAt)}
                </td>
                <td className={styles.mobileViews}>
                  <span className={color}>{views}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MobileTable;
