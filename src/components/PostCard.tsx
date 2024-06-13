import React from "react";
import { Post } from "../types/common";

import styles from "../styles/components/postcard.module.scss";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { userId, title, body } = post;

  return (
    <div className={styles.post}>
      <div className={styles.cardHeader}>
        <span className={styles.user}>User {userId}</span>
      </div>

      <div className={styles.cardBody}>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </div>
  );
};

export default PostCard;
