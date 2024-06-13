import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import styles from "../styles/pages/home.module.scss";
import { Post } from "../types/common";
import { fetchPosts } from "../utils/fetcher";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData);
      } catch (error) {
        setError(true);
      }
    };

    getPosts();
  }, []);

  return (
    <div className={styles.postsWrapper}>
      <h1 className={styles.title}>
        All Posts <span>({posts.length} results)</span>
      </h1>
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
