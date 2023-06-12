// UI HELPERS
interface Styles {
  readonly [key: string]: string;
}

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date
  );
  const day = date.getDate();

  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
};

export const getColorStyles = (view: number, styles: Styles) => {
  switch (true) {
    case view <= 25:
      return styles.viewsTextRed;
    case view <= 50:
      return styles.viewsTextOrange;
    case view <= 75:
      return styles.viewsTextYellow;
    default:
      return styles.viewsTextGreen;
  }
};

// API HELPERS
export const createParams = (
  page: number,
  perPage: number,
  sort?: string,
  filter?: string
) => {
  const params = new URLSearchParams();

  params.append("_page", page.toString());
  params.append("_limit", perPage.toString());

  if (sort && sort.length) {
    params.append("_sort", sort.toString());
  }

  if (filter === "highestViews") {
    params.append("views_gte", "76");
  } else if (filter === "lowestViews") {
    params.append("views_lte", "25");
  } else if (filter === "today") {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    params.append("createdAt_gte", startOfDay.toISOString());
    params.append("createdAt_lt", endOfDay.toISOString());
  }

  return params;
};
