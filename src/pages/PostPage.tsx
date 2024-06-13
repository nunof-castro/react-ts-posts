import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Comment } from "../types/common";
import { fetchComments } from "../utils/fetcher";

const PostPage: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<boolean>(false);

  const { postId } = useParams<{ postId: string }>();

  useEffect(() => {
    const getComments = async () => {
      try {
        const postIdNumber = Number(postId);

        const commentsData = await fetchComments(postIdNumber);
        setComments(commentsData);
      } catch (error) {
        setError(true);
      }
    };

    getComments();
  }, [postId]);

  console.log(comments.length);

  return <div>Post {postId}</div>;
};

export default PostPage;
