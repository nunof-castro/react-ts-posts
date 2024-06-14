import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "../components/CommentForm";
import CommentsList from "../components/CommentsList";
import PostCard from "../components/PostCard";
import { Comment, Post } from "../types/common";
import {
  deleteComment,
  fetchComments,
  fetchPost,
  updateComment,
} from "../utils/fetcher";

const PostPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [editingComment, setEditingComment] = useState<{
    id: number | null;
    body: string;
  }>({ id: null, body: "" });
  const { postId } = useParams<{ postId: string }>();

  const postIdNumber = Number(postId);

  const {
    data: post,
    error: postError,
    isLoading: postLoading,
  } = useQuery<Post>({
    queryKey: ["post", postIdNumber],
    queryFn: () => fetchPost(postIdNumber),
  });

  const {
    data: comments,
    error: commentsError,
    isLoading: commentsLoading,
  } = useQuery<Comment[]>({
    queryKey: ["comments", postIdNumber],
    queryFn: () => fetchComments(postIdNumber),
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: (_, commentId) => {
      queryClient.setQueryData<Comment[]>(
        ["comments", postIdNumber],
        (oldComments) =>
          oldComments
            ? oldComments.filter((comment) => comment.id !== commentId)
            : oldComments
      );
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
    },
  });

  const { mutate: updateMutation } = useMutation({
    mutationFn: ({ commentId, body }: { commentId: number; body: Comment }) =>
      updateComment(commentId, body),
    onSuccess: (updatedComment) => {
      queryClient.setQueryData<Comment[]>(
        ["comments", postIdNumber],
        (oldComments) =>
          oldComments
            ? oldComments.map((comment) =>
                comment.id === updatedComment.id ? updatedComment : comment
              )
            : oldComments
      );
      setEditingComment({ id: null, body: "" });
    },
    onError: (error) => {
      console.error("Error updating comment:", error);
    },
  });

  if (postLoading || commentsLoading) {
    return <div>Loading...</div>;
  }

  if (postError || !post || commentsError || !comments) {
    return <div>Error loading posts</div>;
  }

  const handleCommentDeleted = async (commentId: number) => {
    try {
      deleteMutation.mutate(commentId);
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
    console.log("edited");

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

    updateMutation({ commentId: originalComment.id, body: updatedComment });

    setEditingComment({ id: null, body: "" });
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

      <CommentForm postId={Number(postId)} />
    </div>
  );
};

export default PostPage;
