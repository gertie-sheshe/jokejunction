const API_URL = "http://localhost:3001";

import { createParams } from "./helpers";
import { Joke } from "@jokejunction/types";

type RequestOptions = RequestInit;

interface JokeUpdateData {
  id: number;
  data: {
    [key: string]: any;
  };
}

interface JokeData {
  title: string;
  author: string;
  body: string;
  createdAt: number;
}

const apiRequest = async <T>(
  url: string,
  options: RequestOptions
): Promise<T> => {
  const result = await fetch(url, options);

  if (!result.ok) {
    throw new Error(
      `Request failed with status ${result.status}: ${result.statusText}`
    );
  }

  const contentType = result.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Invalid response format. Expected JSON.");
  }

  try {
    const data = await result.json();
    return data;
  } catch (error) {
    throw new Error("Failed to parse response JSON.");
  }
};

export const getJokes = (
  page = 1,
  perPage = 5,
  sort?: string,
  filter?: string
): Promise<Joke[]> => {
  const url = new URL(`${API_URL}/jokes`);
  const params = createParams(page, perPage, sort, filter);
  url.search = params.toString();

  return apiRequest(url.toString(), {});
};

export const getJokeById = (id: number): Promise<Joke> => {
  const url = new URL(`${API_URL}/jokes/${id}`);
  return apiRequest(url.toString(), {});
};

export const deleteJoke = (id: number) => {
  const url = new URL(`${API_URL}/jokes/${id}`);
  const options = {
    method: "DELETE",
  };

  return apiRequest(url.toString(), options);
};

export const updateJoke = (updateData: JokeUpdateData): Promise<Joke> => {
  const { id, data } = updateData;
  const url = new URL(`${API_URL}/jokes/${id}`);

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return apiRequest(url.toString(), options);
};

export const createJoke = ({
  title,
  author,
  body,
  createdAt,
}: JokeData): Promise<Joke> => {
  const url = new URL(`${API_URL}/jokes`);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, author, body, createdAt, views: 100 }),
  };

  return apiRequest(url.toString(), options);
};
