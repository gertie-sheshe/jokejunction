import { QueryKey } from "@tanstack/react-query";

export const JOKE_PAGINATE_KEY = (queries: string[]) => ["jokes", { queries }];

export const JOKE_BY_ID_KEY = (id: string | number) =>
  ["jokes", id] as QueryKey;
