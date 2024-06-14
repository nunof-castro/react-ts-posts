import React, { useState } from "react";
import { Comment } from "../types/common";
import { createComment } from "../utils/fetcher";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "../styles/components/commentsform.module.scss";

interface CommentFormProps {
  postId: number;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (newComment: Omit<Comment, "id">) =>
      await createComment(postId, newComment),
    onSuccess: (newComment) => {
      queryClient.setQueryData<Comment[]>(["comments", postId], (oldComments) =>
        oldComments ? [...oldComments, newComment] : oldComments
      );
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const newComment = {
        postId,
        name,
        email,
        body,
      };

      mutate(newComment);

      setName("");
      setEmail("");
      setBody("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentsForm}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name:</label>
        <input
          className={styles.nameInput}
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input
          className={styles.emailInput}
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="body">Comment:</label>
        <textarea
          className={styles.msgInput}
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button className={styles.submitBtn} type="submit">
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;
