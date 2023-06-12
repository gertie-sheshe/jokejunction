type JokeFormErrors = {
  title?: string;
  author?: string;
  body?: string;
};

type LoginFormErrors = {
  username?: string;
  password?: string;
};

export type Errors = LoginFormErrors & JokeFormErrors;
