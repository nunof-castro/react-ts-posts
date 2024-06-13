import React from "react";
import { useParams } from "react-router-dom";

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  return <div>Post {postId}</div>;
};

export default PostPage;
