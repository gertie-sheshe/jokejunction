import { Errors } from "@jokejunction/types";

interface ValidationRule {
  fieldName: string;
  errorMessage: string;
  validationCondition: (value: string) => boolean;
}

interface LoginForm {
  [key: string]: string;
}

export const validateForm = (
  formData: LoginForm,
  validationRules: ValidationRule[],
  setErrors: React.Dispatch<React.SetStateAction<Errors>>
) => {
  const newErrors: Record<string, string> = {};

  // Iterate through the validation rules
  validationRules.forEach((rule) => {
    const { fieldName, errorMessage, validationCondition } = rule;
    const fieldValue = formData[fieldName];

    // Perform validation based on the validation condition
    if (validationCondition && !validationCondition(fieldValue)) {
      newErrors[fieldName] = errorMessage;
    }
  });

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

export const loginValidationRules = [
  {
    fieldName: "username",
    errorMessage: "Username is required",
    validationCondition: (value: string) => value.length > 2,
  },
  {
    fieldName: "password",
    errorMessage: "Password is required. Minimum length of 8",
    validationCondition: (value: string) => value.length > 8,
  },
];

export const jokeValidationRules = [
  {
    fieldName: "title",
    errorMessage: "Title is required",
    validationCondition: (value: string) => value.length > 2,
  },
  {
    fieldName: "author",
    errorMessage: "Author is required",
    validationCondition: (value: string) => value.length > 2,
  },
  {
    fieldName: "body",
    errorMessage: "Joke body is required. Minimum length of 8",
    validationCondition: (value: string) => value.length > 8,
  },
];
