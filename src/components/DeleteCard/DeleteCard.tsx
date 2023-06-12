import React from "react";
import { deleteJoke } from "@jokejunction/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

import useTheme from "@jokejunction/hooks/useTheme";
import styles from "./DeleteCard.module.scss";

interface DeleteCardProps {
  onDelete: () => void;
  onCancel: () => void;
  jokeId?: number;
}

const DeleteCard: React.FC<DeleteCardProps> = ({
  onDelete,
  onCancel,
  jokeId = 0,
}) => {
  const { isDarkMode } = useTheme();
  const router = useRouter();

  const deleteMutation = useMutation(deleteJoke);

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      await deleteMutation.mutateAsync(jokeId);

      router.back();
      onDelete();
    } catch (error) {
      console.error("Failed to update joke:", error);
    }
  };
  return (
    <div className={styles.modalOverlay}>
      <div
        className={
          isDarkMode ? styles.modalContainerDark : styles.modalContainerLight
        }
      >
        <div className={styles.modalCard}>
          <h2>Confirmation</h2>
          <p className={styles.confirmText}>
            Are you prepared to bid farewell to this humorous gem?
          </p>
          <div className={styles.modalButtons}>
            <button
              className={
                isDarkMode
                  ? styles.buttonDangerPrimaryDark
                  : styles.buttonDangerPrimaryLight
              }
              onClick={handleDelete}
            >
              Delete
            </button>
            <button className={styles.buttonSecondaryLight} onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCard;
