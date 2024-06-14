import React from "react";
import PostList from "../components/PostList";
import { Post } from "../types/common";
import { fetchPosts } from "../utils/fetcher";

import { useQuery } from "@tanstack/react-query";
import styles from "../styles/pages/home.module.scss";

const Home: React.FC = () => {
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery<Post[]>({ queryKey: ["posts"], queryFn: fetchPosts });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !posts) {
    return <div>Error loading posts</div>;
  }

  return (
    <div className={styles.postsWrapper}>
      <h1 className={styles.title}>
        All Posts <span>({posts?.length} results)</span>
      </h1>
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
