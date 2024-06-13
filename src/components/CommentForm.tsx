import React, { useState } from "react";
import { Comment } from "../types/common";
import { createComment } from "../utils/fetcher";

import styles from "../styles/components/commentsform.module.scss";

interface CommentFormProps {
  postId: number;
  onCommentCreated: (newComment: Comment) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  onCommentCreated,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const newComment = await createComment(postId, {
        postId,
        name,
        email,
        body,
      });
      onCommentCreated(newComment);
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
