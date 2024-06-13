import React from "react";
import { Comment } from "../types/common";

import styles from "../styles/components/commentslist.module.scss";

interface CommentsListProps {
  comments: Comment[];
  editingComment: { id: number | null; body: string };
  onEditStart: (id: number, body: string) => void;
  onEditCancel: () => void;
  onEditConfirm: () => void;
  onCommentDelete: (id: number) => void;
  onEditingCommentChange: (body: string) => void;
}

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  editingComment,
  onEditStart,
  onEditCancel,
  onEditConfirm,
  onCommentDelete,
  onEditingCommentChange,
}) => {
  return (
    <div className={styles.comments}>
      <p className={styles.title}>Comments ({comments.length})</p>
      {comments.map(({ id, body, name, email }) => (
        <div key={id} className={styles.comment}>
          <p className={styles.userInfo}>
            {name} <span>{email}</span>
          </p>
          {editingComment.id === id ? (
            <div className={styles.editingComment}>
              <textarea
                value={editingComment.body}
                onChange={(e) => onEditingCommentChange(e.target.value)}
              />
              <div className={styles.editingButtons}>
                <button className={styles.button} onClick={onEditConfirm}>
                  Confirm
                </button>
                <button className={styles.button} onClick={onEditCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className={styles.commentBody}>{body}</p>
              <div className={styles.actionButtons}>
                <button
                  className={styles.button}
                  onClick={() => onCommentDelete(id)}
                >
                  Delete
                </button>
                <button
                  className={styles.button}
                  onClick={() => onEditStart(id, body)}
                >
                  Edit
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
