import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../types/common";

import styles from "../styles/components/postlist.module.scss";

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  console.log(posts);

  return (
    <div className={styles.postsList}>
      {posts.map(({ body, id, title, userId }) => {
        return (
          <Link to={`/posts/${id}`} key={id}>
            <div className={styles.post}>
              <div className={styles.cardHeader}>
                <span className={styles.user}>User {userId}</span>
              </div>

              <div className={styles.cardBody}>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PostList;
