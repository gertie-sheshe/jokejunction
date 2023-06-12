import React, { useState, FormEvent, ChangeEvent, MouseEvent } from "react";
import useTheme from "@jokejunction/hooks/useTheme";
import ErrorText from "@jokejunction/components/ErrorText";
import DeleteCard from "@jokejunction/components/DeleteCard";
import {
  validateForm,
  jokeValidationRules,
} from "@jokejunction/utils/validation";

import styles from "./JokeForm.module.scss";
import { Joke, Errors } from "@jokejunction/types";

interface JokeFormProps extends Partial<Joke> {
  handleFormSubmit: (
    event: FormEvent,
    formData: Pick<Joke, "title" | "author" | "body">
  ) => void;
}

const JokeForm: React.FC<JokeFormProps> = ({
  id,
  title,
  author,
  views,
  body,
  handleFormSubmit,
}) => {
  const { isDarkMode } = useTheme();

  const [errors, setErrors] = useState<Errors>({});
  const [showModal, setShowModal] = useState(false);

  const [formValues, setFormValues] = useState({
    title: title || "",
    author: author || "",
    body: body || "",
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Validate Form
    const isFormValid = validateForm(
      formValues,
      jokeValidationRules,
      setErrors
    );

    if (isFormValid) {
      await handleFormSubmit(event, formValues);
    }
  };

  const handleDelete = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleDeleteClick = (event: MouseEvent) => {
    event.preventDefault();
    setShowModal(true);
  };

  return (
    <form>
      {showModal && (
        <DeleteCard
          jokeId={id}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      )}
      {views && views > 0 && (
        <p
          className={isDarkMode ? styles.viewsTextDark : styles.viewsTextLight}
        >
          This joke has <span>{`${views} views`}</span> so far
        </p>
      )}
      <div className={styles.control}>
        <label className={styles.label} htmlFor="title">
          Title:
        </label>
        <input
          className={isDarkMode ? styles.inputDark : styles.inputLight}
          id="title"
          name="title"
          type="text"
          required
          value={formValues.title}
          onChange={handleInputChange}
        />
        {errors.title && <ErrorText text={errors.title} />}
      </div>
      <div className={styles.control}>
        <label className={styles.label} htmlFor="author">
          Author:
        </label>
        <input
          className={isDarkMode ? styles.inputDark : styles.inputLight}
          id="author"
          name="author"
          type="text"
          required
          value={formValues.author}
          onChange={handleInputChange}
        />
        {errors.author && <ErrorText text={errors.author} />}
      </div>
      <div className={styles.control}>
        <label className={styles.label} htmlFor="joke">
          Joke:
        </label>
        <textarea
          className={`${styles.textarea} ${
            isDarkMode ? styles.inputDark : styles.inputLight
          }`}
          id="joke"
          name="body"
          required
          value={formValues.body}
          onChange={handleInputChange}
        />
        {errors.body && <ErrorText text={errors.body} />}
      </div>

      <div className={styles.formActions}>
        <button
          onClick={handleSubmit}
          className={
            isDarkMode ? styles.buttonPrimaryDark : styles.buttonPrimaryLight
          }
        >
          {title ? "Edit" : "Create"}
        </button>
        {title && (
          <button
            onClick={handleDeleteClick}
            className={`${
              isDarkMode ? styles.buttonSecondary : styles.buttonSecondaryLight
            } ${styles.button}`}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default JokeForm;
