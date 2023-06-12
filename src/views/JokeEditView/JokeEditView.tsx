import React, { FormEvent } from "react";
import useTheme from "@jokejunction/hooks/useTheme";
import JokeForm from "@jokejunction/components/JokeForm";
import HintText from "@jokejunction/components/HintText";
import HintIcon from "@jokejunction/components/HintIcon";

import { useRouter } from "next/router";
import { Joke } from "@jokejunction/types";

interface JokeEditViewProps {
  jokeData?: Joke;
  heading: string;
}

import styles from "./JokeEditView.module.scss";

const JokeEditView: React.FC<JokeEditViewProps> = ({ heading, jokeData }) => {
  const { isDarkMode } = useTheme();

  const router = useRouter();

  const handleCreateSubmit = async (
    event: FormEvent,
    formValues: Pick<Joke, "title" | "author" | "body">
  ) => {
    event.preventDefault();

    router.back();
  };

  const handleEditSubmit = async (
    event: FormEvent,
    formValues: Pick<Joke, "title" | "author" | "body">
  ) => {
    event.preventDefault();
    router.back();
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
      <div className={styles.navigation}>
        <button
          onClick={handleGoBack}
          className={
            isDarkMode ? styles.backButtonDark : styles.backButtonLight
          }
        >
          Go Back
        </button>
      </div>
      <div className={styles.pageContainer}>
        <div className={styles.hintContent}>
          <HintText isDarkMode={isDarkMode} title={jokeData?.title ?? ""} />
          <HintIcon isDarkMode={isDarkMode} />
        </div>
        <div
          className={
            isDarkMode ? styles.formContentDark : styles.formContentLight
          }
        >
          <div className={styles.formContainer}>
            <div className={styles.formCard}>
              <h1
                className={`${styles.h1} ${
                  isDarkMode ? styles.headerDark : styles.headerLight
                }`}
              >
                {heading}
              </h1>
              <div className={styles.cardContent}>
                {heading === "Create New Joke" && (
                  <JokeForm handleFormSubmit={handleCreateSubmit} />
                )}
                {heading === "Edit Joke" && (
                  <JokeForm {...jokeData} handleFormSubmit={handleEditSubmit} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JokeEditView;
