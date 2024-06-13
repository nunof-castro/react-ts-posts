import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "../components/CommentForm";
import PostCard from "../components/PostCard";
import { Comment, Post } from "../types/common";
import {
  deleteComment,
  fetchComments,
  fetchPost,
  updateComment,
} from "../utils/fetcher";

import CommentsList from "../components/CommentsList";
import styles from "../styles/pages/postpage.module.scss";

const PostPage: React.FC = () => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [editingComment, setEditingComment] = useState<{
    id: number | null;
    body: string;
  }>({ id: null, body: "" });

  const { postId } = useParams<{ postId: string }>();

  useEffect(() => {
    const getPostAndComments = async () => {
      try {
        const postIdNumber = Number(postId);

        const postData = await fetchPost(postIdNumber);
        const commentsData = await fetchComments(postIdNumber);

        setPost(postData);
        setComments(commentsData);
      } catch (error) {
        setError(true);
      }
    };

    if (postId) {
      getPostAndComments();
    }
  }, [postId]);

  if (error) {
    return <div>Error loading post and comments...</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleCommentCreated = (newComment: Comment) => {
    setComments([...comments, newComment]);
  };

  const handleCommentDeleted = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleStartEditing = (commentId: number, commentBody: string) => {
    setEditingComment({ id: commentId, body: commentBody });
  };

  const handleCancelEditing = () => {
    setEditingComment({ id: null, body: "" });
  };

  const handleConfirmEditing = async () => {
    try {
      if (editingComment.body.trim() === "") {
        console.error("Comment body cannot be empty.");
        return;
      }

      const originalComment = comments.find(
        (comment) => comment.id === editingComment.id
      );
      if (!originalComment) {
        console.error("Original comment not found.");
        return;
      }

      const updatedComment: Comment = {
        ...originalComment,
        body: editingComment.body,
      };

      const response = await updateComment(editingComment.id!, updatedComment);

      setComments(
        comments.map((comment) =>
          comment.id === editingComment.id ? response : comment
        )
      );

      setEditingComment({ id: null, body: "" });
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleEditingCommentChange = (body: string) => {
    setEditingComment((prev) => ({ ...prev, body }));
  };

  return (
    <div>
      <PostCard post={post} />
      {comments?.length > 0 && (
        <CommentsList
          comments={comments}
          editingComment={editingComment}
          onEditStart={handleStartEditing}
          onEditCancel={handleCancelEditing}
          onEditConfirm={handleConfirmEditing}
          onCommentDelete={handleCommentDeleted}
          onEditingCommentChange={handleEditingCommentChange}
        />
      )}

      <CommentForm
        postId={Number(postId)}
        onCommentCreated={handleCommentCreated}
      />
    </div>
  );
};

export default PostPage;
