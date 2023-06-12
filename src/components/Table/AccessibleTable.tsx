import React from "react";
import Link from "next/link";
import useTheme from "@jokejunction/hooks/useTheme";
import { formatDate, getColorStyles } from "@jokejunction/utils/helpers";
import styles from "./Table.module.scss";
import { Joke } from "@jokejunction/types";

interface AccessibleTableProps {
  jokes: Joke[];
  srFriendly: boolean;
}

const AccessibleTable: React.FC<AccessibleTableProps> = ({
  srFriendly,
  jokes,
}) => {
  //NOTE: if srFriendly is true, the styles provide
  //the ability to scroll horizontally which works
  //best for screen readers

  const { isDarkMode } = useTheme();

  if (!jokes) return null;

  return (
    <div
      className={
        isDarkMode ? styles.tableWrapperDark : styles.tableWrapperLight
      }
    >
      <table
        className={srFriendly ? styles.accessibleTable : styles.table}
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
        <thead
          className={isDarkMode ? styles.tableHeadDark : styles.tableHeadLight}
        >
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
              <tr key={id} className={styles.tableRow}>
                <td className={styles.title}>
                  <Link
                    className={isDarkMode ? styles.linkDark : styles.linkLight}
                    href={`/jokes/edit/${id}`}
                  >
                    {title}
                  </Link>
                </td>
                <td className={styles.author}>{author}</td>
                <td className={isDarkMode ? styles.dateDark : styles.dateLight}>
                  {formatDate(createdAt)}
                </td>
                <td className={styles.views}>
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

export default AccessibleTable;
