import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../types/common";

import styles from "../styles/components/postlist.module.scss";
import PostCard from "./PostCard";

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  console.log(posts);

  return (
    <div className={styles.postsList}>
      {posts.map((post) => {
        const { id } = post;

        return (
          <Link to={`/posts/${id}`} key={id}>
            <PostCard post={post} />
          </Link>
        );
      })}
    </div>
  );
};

export default PostList;
